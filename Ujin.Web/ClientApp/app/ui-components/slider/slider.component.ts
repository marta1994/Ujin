import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit {

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
        if (val === this._value) {
            return;
        }
        this._value = val;
        this.valueChange.emit(this._value);
    }

  constructor() { }

  ngOnInit() {
  }

}
