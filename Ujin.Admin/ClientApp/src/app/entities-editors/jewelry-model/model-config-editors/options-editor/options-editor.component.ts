import { Component, OnInit, Input } from '@angular/core';
import { ModelConfiguration, JewelryModelState } from '../../models';
import { MetalEditorService, Metal } from 'src/app/entities-editors/metal-editor/metal-editor.service';
import { GemstoneService, Gemstone } from 'src/app/entities-editors/gemstone/gemstone.service';
import { EnumService, NameValue } from 'src/app/services/enum.service';
import { ITableConfig, ColumnType, ITextColumn, INumberColumn, IActionColumn } from 'src/app/ui-components/table/table.component';
import { ArrayService } from 'src/app/services/array.service';

@Component({
  selector: 'app-options-editor',
  templateUrl: './options-editor.component.html',
  styleUrls: ['./options-editor.component.less']
})
export class OptionsEditorComponent implements OnInit {

  private _selectorOptions: SelectorOptions;

  public metals: Metal[];
  public gemstones: Gemstone[];

  public availableSources: NameValue<OptionsSource>[];

  public OptionsSource = OptionsSource;

  @Input()
  public modelConfig: ModelConfiguration;

  constructor(
    private _metalService: MetalEditorService,
    private _gemstoneService: GemstoneService,
    private _enumService: EnumService,
    private _arrayService: ArrayService) { }

  ngOnInit() {
    this._selectorOptions = new SelectorOptions(this.modelConfig.configurationOptions);
    Promise.all([this._metalService.loadMetals(), this._gemstoneService.loadGemstones()])
      .then(res => {
        this.metals = res[0];
        this.gemstones = res[1];
      });
    this.availableSources = this._enumService.getNameValues(OptionsSource);
  }

  public get optionsSource(): OptionsSource {
    return this._selectorOptions.optionsSource;
  }
  public set optionsSource(val: OptionsSource) {
    if (this._selectorOptions.optionsSource === val) return;
    this._selectorOptions.optionsSource = val;
    this._selectorOptions.customOptions = [];
    this._selectorOptions.externalSourceIds = [];
    this.onPropertyChanged();
  }

  public get customOptions(): Option[] {
    return this._selectorOptions.customOptions;
  }

  public get externalSourceIds(): number[] {
    return this._selectorOptions.externalSourceIds;
  }

  public get gemstoneTableOptions(): ITableConfig {
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
          columnNameKey: "Тип",
          isEditable: false,
          displayPropertyName: "gemstoneClassName",
          isTranslated: true,
          isOrderable: true
        },
        {
          columnNameKey: "Походження",
          isEditable: false,
          displayPropertyName: "gemstoneSourceName",
          isTranslated: true,
          isOrderable: true
        },
        {
          columnNameKey: "Ограновування",
          isEditable: false,
          displayPropertyName: "gemstoneCutName",
          isTranslated: true,
          isOrderable: true
        },
        {
          columnNameKey: "Колір",
          isEditable: false,
          displayPropertyName: "colorName",
          isTranslated: true,
          isOrderable: true
        },
        {
          columnNameKey: "Вага (карат)",
          isEditable: false,
          displayPropertyName: "weight",
          isTranslated: false,
          isOrderable: true
        },
        {
          columnNameKey: "Ширина (мм)",
          isEditable: false,
          displayPropertyName: "widthMm",
          isTranslated: false,
          isOrderable: true
        },
        {
          columnNameKey: "Довжина (мм)",
          isEditable: false,
          displayPropertyName: "heightMm",
          isTranslated: false,
          isOrderable: true
        },
        {
          columnNameKey: "Ціна (собівартість)",
          isEditable: false,
          displayPropertyName: "price",
          isTranslated: false,
          isOrderable: true
        }
      ]
    }
  }

  public get metalTableOptions(): ITableConfig {
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
          columnNameKey: "Назва",
          isEditable: false,
          displayPropertyName: "nameKey",
          isTranslated: true,
          isOrderable: true
        },
        {
          columnNameKey: "Ціна за грам",
          isEditable: false,
          displayPropertyName: "pricePerGram",
          isTranslated: false,
          isOrderable: true
        }
      ]
    }
  }

  public get customOptionsTableConfig(): ITableConfig {
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
          isEditable: true,
          displayPropertyName: "nameKey",
          isTranslated: false,
          isOrderable: true,
          columnType: ColumnType.Text,
          columnOptions: <ITextColumn> {
            editPropertyName: "nameKey",
            placeholder: "назва",
            onEdited: () => this.onPropertyChanged()
          }
        },
        {
          columnNameKey: "Назва зі словника",
          isEditable: false,
          displayPropertyName: "nameKey",
          isTranslated: true,
          isOrderable: true
        },
        {
          columnNameKey: "Значення",
          isEditable: true,
          displayPropertyName: "value",
          isTranslated: false,
          isOrderable: false,
          columnType: ColumnType.Number,
          columnOptions: <INumberColumn>{
            editPropertyName: "value",
            onEdited: () => this.onPropertyChanged()
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
            action: (item: Option) => {
              this._arrayService.deleteItem(this.customOptions, item);
              this.onPropertyChanged();
            },
            text: "Видалити",
            isActionAllowed: () => {
              return this.modelConfig.modelState === JewelryModelState.BuildingState;
            }
          }
        }
      ]
    }
  }

  public addNewCustomOption() {
    this.customOptions.push(new Option({
      nameKey: "jewelryModel.modelConfig.customOption.ornament.NEW_NAME",
      id: Math.max.apply(null, this.customOptions.map(o => o.id).concat([0])) + 1,
      value: 0
    }));
    this.onPropertyChanged();
  }

  public onPropertyChanged() {
    this.modelConfig.configurationOptions = JSON.stringify(this._selectorOptions);
  }
}

class SelectorOptions {

  constructor(serializedOptions: string) {
    let obj = serializedOptions ? JSON.parse(serializedOptions) : {};
    this.optionsSource = obj.optionsSource;
    this.externalSourceIds = obj.externalSourceIds || [];
    this.customOptions = (obj.customOptions || []).map(o => new Option(o));
  }

  public optionsSource: OptionsSource;
  public externalSourceIds: number[];
  public customOptions: Option[];
}

class Option {

  constructor(o: Option) {
    this.nameKey = o.nameKey;
    this.id = o.id;
    this.value = o.value;
  }

  public nameKey: string;
  public id: number;
  public value: number;
}

enum OptionsSource {
  Custom = 1,
  Metal = 2,
  Gemstone = 3
}
