import { Component, OnInit, Input } from '@angular/core';
import { GemstoneService, NamedEntity, GemNamedEntity } from '../gemstone.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ITableConfig, ColumnType, ITextColumn, IActionColumn } from 'src/app/ui-components/table/table.component';

@Component({
  selector: 'app-named-entity-editor',
  templateUrl: './named-entity-editor.component.html',
  styleUrls: ['./named-entity-editor.component.less']
})
export class NamedEntityEditorComponent implements OnInit {

  @Input()
  public entityType: GemNamedEntity;

  @Input()
  public placeholder: string;

  private _entities: NamedEntity[];

  constructor(private _gemstoneService: GemstoneService, route: ActivatedRoute) {
    this.entityType = (<BehaviorSubject<any>>route.data).value.entityType;
    this.placeholder = (<BehaviorSubject<any>>route.data).value.placeholder;
  }

  ngOnInit() {
    this._gemstoneService.loadGemSources(this.entityType)
      .then(res => this._entities = res)
      .catch(err => alert("Помилка завантаження. " + err));
  }

  public get entities(): NamedEntity[] {
    return this._entities;
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
          columnOptions: <ITextColumn> {
            editPropertyName: "nameKey",
            placeholder: this.placeholder
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
          columnNameKey: "Видалення",
          isEditable: false,
          displayPropertyName: "",
          isTranslated: false,
          isOrderable: false,
          columnType: ColumnType.Action,
          columnOptions: <IActionColumn> {
            action: (item: NamedEntity) => this.deleteItem(item),
            text: "Видалити",
            isActionAllowed: (item: NamedEntity) => {
              return item.id <= 0;
            }
          }
        }
      ]
    }
  }

  public deleteItem(item: NamedEntity) {
    let ind = this._entities.indexOf(item);
    if (ind < 0) return;
    this._entities.splice(ind, 1);
  }

  public addNew() {
    this._entities.push(new NamedEntity({ id: -1, nameKey: "" }));
  }

  public saveChanges() {
    this._gemstoneService.saveGemSources(this._entities, this.entityType)
      .then(() => location.reload())
      .catch(err => alert("Помидка при збереженні: " + err));
  }
}
