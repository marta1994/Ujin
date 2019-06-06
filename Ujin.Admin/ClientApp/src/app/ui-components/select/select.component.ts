import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less']
})
export class SelectComponent implements OnInit {

  private _model: any; 
  public get model(): any {
    return this._model;
  }
  @Input()
  public set model(val: any) {
    if (this._model === val) return;
    this._model = val;
    this.modelChange.emit(this._model);
  }
  @Output()
  public modelChange = new EventEmitter<any>();

  @Input()
  public options: any[];

  @Input()
  public valueProperty: string;

  @Input()
  public nameProperty: string;

  @Input()
  public translated: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
