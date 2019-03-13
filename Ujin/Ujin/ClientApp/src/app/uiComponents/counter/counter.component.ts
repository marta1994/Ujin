import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.less']
})
export class CounterComponent implements OnInit {

  @Input()
  public min: number = 0;

  @Input()
  public max: number = 100;

  @Input()
  public step: number = 1;

  private _value: number;

  @Output()
  public valueChange: EventEmitter<number> = new EventEmitter<number>();

  public get value(): number {
    return this._value;
  }
  @Input()
  public set value(val: number) {
    if (val === this._value || !this.isValueValid(val)) {
      return;
    }
    this._value = val;
    this.valueChange.emit(this._value);
  }

  constructor() { }

  ngOnInit() {
  }

  private isValueValid(val: number): boolean {
    var stepNum = (val - this.min) / this.step;
    return stepNum === Math.floor(stepNum);
  }

  public increaseVal() {
    if (this.value + this.step > this.max) {
      return;
    }
    this.value += this.step;
  }

  public decreaseVal() {
    if (this.value - this.step < this.min) {
      return;
    }
    this.value -= this.step;
  }
}
