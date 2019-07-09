import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JewelryModel, ModelConfiguration, JewelryModelConfigType, getJewelryModelConfigTypeKey, JewelryModelState } from '../models';
import { JewelryModelService } from '../jewelry-model.service';
import { ITableConfig, ColumnType, IActionColumn } from 'src/app/ui-components/table/table.component';
import { EnumService, NameValue } from 'src/app/services/enum.service';
import { ArrayService } from 'src/app/services/array.service';
import { IHintSource } from 'src/app/ui-components/hint-input/hint-input.component';
import { SelectorOptions, OptionsSource } from '../model-config-editors/options-editor/options-editor.component';

@Component({
  selector: 'app-model-editor',
  templateUrl: './model-editor.component.html',
  styleUrls: ['./model-editor.component.less']
})
export class ModelEditorComponent implements OnInit {

  public jewelryModel: JewelryModel;

  public modelConfig: ModelConfiguration;

  public configTypes: NameValue<JewelryModelConfigType>[];

  public JewelryModelConfigType = JewelryModelConfigType;

  public isEditPanelOpened: boolean = false;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _jewelryModelService: JewelryModelService,
    private _enumService: EnumService,
    private _arrayService: ArrayService) { }

  ngOnInit() {
    let id = +this._activatedRoute.snapshot.paramMap.get("id");
    if (id > 0) {
      this._jewelryModelService.loadJewelryModel(id)
        .then(m => this.jewelryModel = m)
        .catch(error => alert("Помилка при завантаженні " + error));
    } else {
      this.jewelryModel = new JewelryModel({
        id: -1,
        nameKey: "jewelryModel.name.NEW_NAME",
        descriptionKey: "jewelryModel.description.NEW_NAME",
        identifier: "ID",
        imagesPattern: "[]",
        priceExpression: "0",
        weightExpression: "0",
        modelState: JewelryModelState.BuildingState,
        configurations: []
      });
    }

    this.configTypes = this._enumService.getNameValues(JewelryModelConfigType);
    this.configTypes.forEach(c => c.name = getJewelryModelConfigTypeKey(c.value));
  }

  private _priceHintSource: IHintSource[];

  public get priceHintSource(): IHintSource[] {
    if (this._priceHintSource == null) {
      this._priceHintSource = 
      this._priceHintSource = this.jewelryModel.configurations.map(cfg => {
        switch (cfg.configurationType) {
          case JewelryModelConfigType.Number:
            return { name: cfg.identifier, children: [{ name: "value" }] };
          case JewelryModelConfigType.Options: {
            return this.getOptionsHintSource(cfg);
          }
          default: return null;
        }
      });
    }
    return this._priceHintSource;
  }

  private getOptionsHintSource(cfg: ModelConfiguration): IHintSource {
    let opts = new SelectorOptions(cfg.configurationOptions);
    switch (opts.optionsSource) {
      case OptionsSource.Metal:
        return {
          name: cfg.identifier, children: [
            { name: "identifier" },
            { name: "pricePerGram" },
            { name: "gramsPerMl" }]
        };
      case OptionsSource.Gemstone:
        return {
          name: cfg.identifier, children: [
            { name: "identifier" }, 
            { name: "price" }
          ]
        };
      case OptionsSource.Custom:
        return { name: cfg.identifier, children: [{ name: "identifier" }, { name: "value" }] };
      default: return null;
    }
  }

  public get tableConfig(): ITableConfig {
    return {
      columnsConfig: [
        {
          columnNameKey: "ID",
          isEditable: false,
          displayPropertyName: "id",
          isTranslated: false,
          isOrderable: true
        },
        {
          columnNameKey: "Ідентифікатор",
          isEditable: false,
          displayPropertyName: "identifier",
          isTranslated: false,
          isOrderable: true
        },
        {
          columnNameKey: "Назва зі словника",
          isEditable: false,
          displayPropertyName: "nameKey",
          isTranslated: true,
          isOrderable: true
        },
        {
          columnNameKey: "Тип конфігурації",
          isEditable: false,
          displayPropertyName: "configurationTypeNameKey",
          isTranslated: true,
          isOrderable: true
        },
        {
          columnNameKey: "Редагування",
          isEditable: false,
          displayPropertyName: "",
          isTranslated: false,
          isOrderable: false,
          columnType: ColumnType.Action,
          columnOptions: <IActionColumn>{
            action: (item: ModelConfiguration) => {
              this.modelConfig = item;
              this.isEditPanelOpened = true;
            },
            text: "Редагувати",
            isActionAllowed: (item: ModelConfiguration) => true
          }
        },
        {
          columnNameKey: "Видалення",
          isEditable: false,
          displayPropertyName: "",
          isTranslated: false,
          isOrderable: false,
          columnType: ColumnType.Action,
          columnOptions: <IActionColumn>{
            action: (item: ModelConfiguration) => this.deleteConfig(item),
            text: "Видалити",
            isActionAllowed: (item: ModelConfiguration) => item.id <= 0
          }
        }
      ]
    }
  }

  public changeModelState() {
    if (this.jewelryModel.id < 0) return;
    let text = "";
    switch (this.jewelryModel.modelState) {
      case JewelryModelState.BuildingState:
        text = "Впевнені, що хочете активувати модель? Модель та усі її варіації стануть доступними у магазині, деякі властивості стануть недоступними для редагування.";
        break;
      case JewelryModelState.Enabled:
        text = "Впевнені, що хочете дизактивувати модель? Модель та усі її варіації стануть недоступними у магазині, покупці більше не зможуть замовляти їх.";
        break;
      case JewelryModelState.Disabled:
        text = "Впевнені, що хочете активувати модель? Модель та усі її варіації стануть доступними у магазині.";
        break;
    }
    let confirmed = confirm(text);
    if (!confirmed) return;

    (this.jewelryModel.modelState === JewelryModelState.Enabled ?
      this._jewelryModelService.disableModel(this.jewelryModel.id) :
      this._jewelryModelService.enableModel(this.jewelryModel.id))
      .then(() => location.reload())
      .catch(err => alert("Помилка при збереженні: " + err));
  }

  public saveModel() {
    this.jewelryModel.configurations.forEach((v, i) => v.order = i + 1);
    this._jewelryModelService.saveJewelryModel(this.jewelryModel)
      .then(() => {
        if (this.jewelryModel.id <= 0) {
          this._router.navigate(['../../models'], { relativeTo: this._activatedRoute })
            .then(() => location.reload());
          return;
        }
        location.reload();
      })
      .catch(err => alert("Помилка при збереженні: " + err));
  }

  public addNew() {
    this.jewelryModel.configurations.push(new ModelConfiguration({
      id: -1,
      nameKey: "jewelryModel.modelConfig.name.NEW_NAME",
      identifier: "CONFIG_ID",
      order: this.jewelryModel.configurations.length + 1,
      configurationType: null,
      jewelryModelId: this.jewelryModel.id,
      configurationOptions: ""
    }, this.jewelryModel));
  }

  public deleteConfig(config: ModelConfiguration) {
    this._arrayService.deleteItem(this.jewelryModel.configurations, config);
    if (this.modelConfig === config)
      this.modelConfig = null;
  }
}
