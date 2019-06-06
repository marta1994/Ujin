import { Component, OnInit } from '@angular/core';
import { Gemstone, GemstoneService, NamedEntity, GemNamedEntity } from '../gemstone.service';
import { ColorEditorService, Color } from 'src/app/entities-editors/color-editor/color-editor.service';
import { ITableConfig, ColumnType, IOptionsColumn, IActionColumn, INumberColumn } from 'src/app/ui-components/table/table.component';

@Component({
  selector: 'app-gem-instance',
  templateUrl: './gem-instance.component.html',
  styleUrls: ['./gem-instance.component.less']
})
export class GemInstanceComponent implements OnInit {

  public gemstones: Gemstone[];

  private _colors: Color[];
  private _gemSources: NamedEntity[];
  private _gemClasses: NamedEntity[];
  private _gemCuts: NamedEntity[];

  constructor(
    private _gemstoneService: GemstoneService,
    private _colorService: ColorEditorService) { }

  ngOnInit() {
    Promise.all([
      this._gemstoneService.loadGemNamedEntities(GemNamedEntity.GemClass),
      this._gemstoneService.loadGemNamedEntities(GemNamedEntity.GemCut),
      this._gemstoneService.loadGemNamedEntities(GemNamedEntity.GemSource),
      this._colorService.loadColors(),
      this._gemstoneService.loadGemstones(),
    ])
      .then(res => {
        this._gemClasses = res[0];
        this._gemCuts = res[1];
        this._gemSources = res[2];
        this._colors = res[3]
        this.gemstones = res[4];
      })
      .catch(err => alert(err));
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
          columnNameKey: "Тип",
          isEditable: true,
          displayPropertyName: "gemstoneClassName",
          isTranslated: true,
          isOrderable: true,
          columnType: ColumnType.Options,
          columnOptions: <IOptionsColumn>{
            editValueProperty: "gemstoneClassId",
            editOptionProperty: "gemstoneClass",
            options: this._gemClasses,
            optionValueProperty: "id",
            optionDisplayProperty: "nameKey"
          }
        },
        {
          columnNameKey: "Походження",
          isEditable: true,
          displayPropertyName: "gemstoneSourceName",
          isTranslated: true,
          isOrderable: true,
          columnType: ColumnType.Options,
          columnOptions: <IOptionsColumn>{
            editValueProperty: "gemstoneSourceId",
            editOptionProperty: "gemstoneSource",
            options: this._gemSources,
            optionValueProperty: "id",
            optionDisplayProperty: "nameKey"
          }
        },
        {
          columnNameKey: "Ограновування",
          isEditable: true,
          displayPropertyName: "gemstoneCutName",
          isTranslated: true,
          isOrderable: true,
          columnType: ColumnType.Options,
          columnOptions: <IOptionsColumn>{
            editValueProperty: "gemstoneCutId",
            editOptionProperty: "gemstoneCut",
            options: this._gemCuts,
            optionValueProperty: "id",
            optionDisplayProperty: "nameKey"
          }
        },
        {
          columnNameKey: "Колір",
          isEditable: true,
          displayPropertyName: "colorName",
          isTranslated: true,
          isOrderable: true,
          columnType: ColumnType.Options,
          columnOptions: <IOptionsColumn>{
            editValueProperty: "colorId",
            editOptionProperty: "color",
            options: this._colors,
            optionValueProperty: "id",
            optionDisplayProperty: "nameKey"
          }
        },
        {
          columnNameKey: "Вага (карат)",
          isEditable: true,
          displayPropertyName: "weight",
          isTranslated: false,
          isOrderable: true,
          columnType: ColumnType.Number,
          columnOptions: <INumberColumn>{
            editPropertyName: "weight",
            minValue: 0
          }
        },
        {
          columnNameKey: "Ширина (мм)",
          isEditable: true,
          displayPropertyName: "widthMm",
          isTranslated: false,
          isOrderable: true,
          columnType: ColumnType.Number,
          columnOptions: <INumberColumn>{
            editPropertyName: "widthMm",
            minValue: 0
          }
        },
        {
          columnNameKey: "Довжина (мм)",
          isEditable: true,
          displayPropertyName: "heightMm",
          isTranslated: false,
          isOrderable: true,
          columnType: ColumnType.Number,
          columnOptions: <INumberColumn>{
            editPropertyName: "heightMm",
            minValue: 0
          }
        },
        {
          columnNameKey: "Ціна (собівартість)",
          isEditable: true,
          displayPropertyName: "price",
          isTranslated: false,
          isOrderable: true,
          columnType: ColumnType.Number,
          columnOptions: <INumberColumn>{
            editPropertyName: "price",
            minValue: 0
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
            action: (item: Gemstone) => this.deleteItem(item),
            text: "Видалити",
            isActionAllowed: (item: Gemstone) => {
              return item.id <= 0;
            }
          }
        }
      ]
    }
  }

  public deleteItem(item: Gemstone) {
    let ind = this.gemstones.indexOf(item);
    if (ind < 0) return;
    this.gemstones.splice(ind, 1);
  }

  public addNew() {
    let gemstone = new Gemstone({
      id: -1,
      price: 0,
      weight: 0,
      widthMm: 0,
      heightMm: 0,
      colorId: this._colors[0].id,
      gemstoneClassId: this._gemClasses[0].id,
      gemstoneCutId: this._gemCuts[0].id,
      gemstoneSourceId: this._gemSources[0].id
    });
    this._gemstoneService.fillGemstone(gemstone, this._colors, this._gemClasses, this._gemCuts, this._gemSources);
    this.gemstones.push(gemstone);
  }

  public saveChanges() {
    this._gemstoneService.saveGemstones(this.gemstones)
      .then(() => location.reload())
      .catch(err => alert("Помилка при збереженні: " + err));
  }

  

}
