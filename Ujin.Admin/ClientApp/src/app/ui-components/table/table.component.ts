import {
  Component, OnInit, Input, DoCheck,
  IterableDiffers, IterableDiffer
} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.less']
})
export class TableComponent implements OnInit, DoCheck {

  @Input()
  public dataSource: any[];

  @Input()
  public tableConfig: ITableConfig;

  public rows: Row[] = [];

  public columnType = ColumnType;

  public isTableEditable: boolean;

  private _iterableDiffer: IterableDiffer<any>;

  constructor(private _iterableDiffers: IterableDiffers) {
    this._iterableDiffer = this._iterableDiffers.find([]).create(null);
  }

  public setInEditMode(dataItem: any) {
    dataItem.isInEditMode = true;
  }

  public isInEditMode(dataItem: any): boolean {
    return dataItem.isInEditMode;
  }

  public selectOption(option: any, item: any, column: IColumnConfig) {
    item[(<IOptionsColumn>column.columnOptions).editOptionProperty] =
      (<IOptionsColumn>column.columnOptions).options
        .find(o => o[(<IOptionsColumn>column.columnOptions).optionValueProperty] == option);
  }

  ngOnInit() {
  }

  ngDoCheck() {
    let dataSrcChanges = this._iterableDiffer.diff(this.dataSource);
    if (dataSrcChanges != null) {
      dataSrcChanges.forEachAddedItem(it => {
        this.rows.push(new Row(it.item, this.tableConfig.columnsConfig));
      });
      dataSrcChanges.forEachRemovedItem(it => {
        let rowInd = this.rows.findIndex(r => r.item === it.item);
        if (rowInd >= 0)
          this.rows.splice(rowInd, 1);
      });

      this.isTableEditable = this.rows.find(r => r.columnsConfig.find(c => r.isColumnEditable(c)) != null) != null;
    }
  }
}

class Row {

  constructor(item: any, columnsConfig: IColumnConfig[]) {
    this.item = item;
    this.columnsConfig = columnsConfig;
  }

  public item: any;
  public columnsConfig: IColumnConfig[];

  public isColumnEditable(column: IColumnConfig): boolean {
    return typeof (column.isEditable) == typeof (true)
      ? <boolean>column.isEditable
      : (<((item: any) => boolean)>column.isEditable)(this.item);
  }
}

export interface ITableConfig {
  columnsConfig: IColumnConfig[];
}

export interface IColumnConfig {
  columnNameKey: string;
  isEditable: boolean | ((item: any) => boolean);
  displayPropertyName: string;
  isTranslated: boolean;
  isOrderable: boolean;
  orderPropertyName?: string;
  columnType?: ColumnType;
  columnOptions?: IColumnOptions;
}

interface IColumnOptions {
}

export interface ITextColumn extends IColumnOptions {
  editPropertyName: string;
  placeholder: string;
}

export interface INumberColumn extends IColumnOptions {
  editPropertyName: string;
  minValue?: number;
  maxValue?: number;
}

export interface IOptionsColumn extends IColumnOptions {
  editValueProperty: string;
  editOptionProperty: string;
  options: any[];
  optionValueProperty: string;
  optionDisplayProperty: string;
}

export interface IActionColumn extends IColumnOptions {
  action: (item: any) => void;
  text: string;
  isActionAllowed: (item: any) => boolean;
}

export interface IColorColumn extends IColumnOptions {
  editPropertyName: string;
}

export enum ColumnType {
  Text = 0,
  Boolean = 1,
  Number = 2,
  Options = 3,
  Action = 4,
  Color = 5
}


