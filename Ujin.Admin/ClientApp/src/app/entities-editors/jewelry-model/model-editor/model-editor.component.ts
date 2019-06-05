import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JewelryModel, ModelConfiguration, JewelryModelConfigType, getJewelryModelConfigTypeKey } from '../models';
import { JewelryModelService } from '../jewelry-model.service';
import { ITableConfig, ColumnType, IActionColumn } from 'src/app/ui-components/table/table.component';
import { EnumService, NameValue } from 'src/app/services/enum.service';

@Component({
  selector: 'app-model-editor',
  templateUrl: './model-editor.component.html',
  styleUrls: ['./model-editor.component.less']
})
export class ModelEditorComponent implements OnInit {

  public jewelryModel: JewelryModel;

  public modelConfig: ModelConfiguration;

  public configTypes: NameValue<JewelryModelConfigType>[];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _jewelryModelService: JewelryModelService,
    private _enumService: EnumService) { }

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
        basePrice: 0,
        imagesPattern: "[]",
        priceExpression: "0",
        configurations: []
      });
    }

    this.configTypes = this._enumService.getNameValues(JewelryModelConfigType);
    this.configTypes.forEach(c => c.name = getJewelryModelConfigTypeKey(c.value));
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
          columnNameKey: "Ключ назви",
          isEditable: false,
          displayPropertyName: "nameKey",
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
            action: (item: ModelConfiguration) => this.modelConfig = item,
            text: "Редагувати",
            isActionAllowed: (item: ModelConfiguration) => true
          }
        }
      ]
    }
  }

  public isPanelOpened: boolean = true;
  public openClose() {
    this.isPanelOpened = !this.isPanelOpened;
  }

  public saveModel() {
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
      configurationType: null,
      jewelryModelId: this.jewelryModel.id,
      configurationOptions: ""
    }));
  }
}
