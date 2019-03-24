import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less']
})
export class InputComponent implements OnInit {

  @Input()
  public type: string = "text";

  private _value: any;
  public get value(): any {
    return this._value;
  }

  @Input()
  public set value(val: any) {
    if (this._value === val) return;
    this._value = val;
    this.valueChange.emit(this._value);
  }

  @Output()
  public valueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
