import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ITableConfig, ColumnType, IActionColumn } from '../table/table.component';
import { ArrayService } from 'src/app/services/array.service';

@Component({
  selector: 'app-select-table',
  templateUrl: './select-table.component.html',
  styleUrls: ['./select-table.component.less']
})
export class SelectTableComponent implements OnInit, OnChanges {

  @Input()
  public sourceItems: any[];

  @Input()
  public selectedItems: any[];

  @Input()
  public selectProperty: string;

  @Input()
  public tableConfig: ITableConfig;

  @Output()
  public onSelectionChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  public selectedObjects: any[];

  constructor(private _arrayService: ArrayService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.sourceItems || !this.selectedItems) return;
    this.selectedObjects = this.sourceItems.filter(it => this.isSelected(it));
  }

  public get sourceTableConfig(): ITableConfig {
    let config: ITableConfig = JSON.parse(JSON.stringify(this.tableConfig));
    config.columnsConfig.push({
      columnNameKey: "",
      isEditable: false,
      displayPropertyName: "",
      isTranslated: false,
      isOrderable: false,
      columnType: ColumnType.Action,
      columnOptions: <IActionColumn>{
        action: (item: any) => {
          if (this.selectedObjects.find(it => it === item)) return;
          this.selectedObjects.push(item);
          this.selectedItems.push(this.getObjectToSelect(item));
          this.onSelectionChange.emit(this.selectedItems);
        },
        text: "Вибрати",
        isActionAllowed: () => true
      }
    });

    return config;
  }

  public get selectedTableConfig(): ITableConfig {
    let config: ITableConfig = JSON.parse(JSON.stringify(this.tableConfig));
    config.columnsConfig.push({
      columnNameKey: "",
      isEditable: false,
      displayPropertyName: "",
      isTranslated: false,
      isOrderable: false,
      columnType: ColumnType.Action,
      columnOptions: <IActionColumn>{
        action: (item: any) => {
          this._arrayService.deleteItem(this.selectedObjects, item);
          this._arrayService.deleteItem(this.selectedItems, this.getObjectToSelect(item));
          this.onSelectionChange.emit(this.selectedItems);
        },
        text: "Викинути",
        isActionAllowed: () => true
      }
    });

    return config;
  }

  private getObjectToSelect(item: any) {
    return this.selectProperty ? item[this.selectProperty] : item;
  }

  private isSelected(item): boolean {
    let obj = this.getObjectToSelect(item);
    return this.selectedItems.find(it => it == obj) != null;
  }

}
