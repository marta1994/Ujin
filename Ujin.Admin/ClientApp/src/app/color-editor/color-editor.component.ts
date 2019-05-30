import { Component, OnInit } from '@angular/core';
import { ColorEditorService, Color } from './color-editor.service';
import { ITableConfig, ColumnType, ITextColumn, IActionColumn, IColorColumn } from '../ui-components/table/table.component';

@Component({
  selector: 'app-color-editor',
  templateUrl: './color-editor.component.html',
  styleUrls: ['./color-editor.component.less']
})
export class ColorEditorComponent implements OnInit {

  public colors: Color[];

  constructor(private _colorService: ColorEditorService) { }

  ngOnInit() {
    this._colorService.loadColors()
      .then(cols => this.colors = cols)
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
          columnNameKey: "Колір",
          isEditable: true,
          displayPropertyName: "colorHexCode",
          isTranslated: false,
          isOrderable: false,
          columnType: ColumnType.Color,
          columnOptions: <IColorColumn>{
            editPropertyName: "colorHexCode"
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
            action: (item: Color) => this.deleteItem(item),
            text: "Видалити",
            isActionAllowed: (item: Color) => {
              return item.id <= 0;
            }
          }
        }
      ]
    }
  }

  public deleteItem(item: Color) {
    let ind = this.colors.indexOf(item);
    if (ind < 0) return;
    this.colors.splice(ind, 1);
  }

  public addNew() {
    this.colors.push(new Color({ id: -1, nameKey: "color.NEW_COLOR", colorHexCode: "#747474" }));
  }

  public saveChanges() {
    this._colorService.saveColors(this.colors)
      .then(() => location.reload())
      .catch(err => alert("Помидка при збереженні: " + err));
  }

}
