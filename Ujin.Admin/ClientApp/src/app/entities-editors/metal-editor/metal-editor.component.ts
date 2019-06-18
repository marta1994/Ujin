import { Component, OnInit } from '@angular/core';
import { MetalEditorService, Metal } from './metal-editor.service';
import { ITableConfig, ColumnType, ITextColumn, INumberColumn, IActionColumn } from '../../ui-components/table/table.component';

@Component({
  selector: 'app-metal-editor',
  templateUrl: './metal-editor.component.html',
  styleUrls: ['./metal-editor.component.less']
})
export class MetalEditorComponent implements OnInit {

  public metals: Metal[];

  constructor(private _metalService: MetalEditorService) { }

  ngOnInit() {
    this._metalService.loadMetals()
      .then(ms => this.metals = ms)
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
          columnNameKey: "Ідентифікатор",
          isEditable: true,
          displayPropertyName: "identifier",
          isTranslated: false,
          isOrderable: true,
          columnType: ColumnType.Text,
          columnOptions: <ITextColumn>{
            editPropertyName: "identifier",
            placeholder: "id"
          }
        },
        {
          columnNameKey: "Ключ назви",
          isEditable: true,
          displayPropertyName: "nameKey",
          isTranslated: false,
          isOrderable: true,
          columnType: ColumnType.Text,
          columnOptions: <ITextColumn>{
            editPropertyName: "nameKey",
            placeholder: "Назва кольору"
          }
        },
        {
          columnNameKey: "Назва зі словника",
          isEditable: true,
          displayPropertyName: "nameKey",
          isTranslated: true,
          isOrderable: true
        },
        {
          columnNameKey: "Ціна за грам",
          isEditable: true,
          displayPropertyName: "pricePerGram",
          isTranslated: false,
          isOrderable: true,
          columnType: ColumnType.Number,
          columnOptions: <INumberColumn>{
            editPropertyName: "pricePerGram",
            minValue: 0
          }
        },
        {
          columnNameKey: "К-сть гамів на мл",
          isEditable: true,
          displayPropertyName: "gramsPerMl",
          isTranslated: false,
          isOrderable: true,
          columnType: ColumnType.Number,
          columnOptions: <INumberColumn>{
            editPropertyName: "gramsPerMl",
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
            action: (item: Metal) => this.deleteItem(item),
            text: "Видалити",
            isActionAllowed: (item: Metal) => {
              return item.id <= 0;
            }
          }
        }
      ]
    }
  }

  public deleteItem(item: Metal) {
    let ind = this.metals.indexOf(item);
    if (ind < 0) return;
    this.metals.splice(ind, 1);
  }

  public addNew() {
    this.metals.push(new Metal({
      id: -1,
      nameKey: "metal.NEW_Metal",
      identifier: "METAL_ID",
      pricePerGram: 0,
      gramsPerMl: 0
    }));
  }

  public saveChanges() {
    this._metalService.saveMetals(this.metals)
      .then(() => location.reload())
      .catch(err => alert("Помилка при збереженні: " + err));
  }

}
