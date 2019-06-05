import { Component, OnInit, Input } from '@angular/core';
import { ModelConfiguration } from '../../models';

@Component({
  selector: 'app-number-editor',
  templateUrl: './number-editor.component.html',
  styleUrls: ['./number-editor.component.less']
})
export class NumberEditorComponent implements OnInit {

  private _numberOptions: NumberOptions;

  @Input()
  public modelConfig: ModelConfiguration;

  constructor() { }

  ngOnInit() {
    this._numberOptions = new NumberOptions(this.modelConfig.configurationOptions);
  }

  public get min(): number {
    return this._numberOptions.min;
  }
  public set min(val: number) {
    this._numberOptions.min = val;
    this.onPropertyChanged();
  }

  public get max(): number {
    return this._numberOptions.max;
  }
  public set max(val: number) {
    this._numberOptions.max = val;
    this.onPropertyChanged();
  }

  public get step(): number {
    return this._numberOptions.step;
  }
  public set step(val: number) {
    this._numberOptions.step = val;
    this.onPropertyChanged();
  }

  private onPropertyChanged() {
    this.modelConfig.configurationOptions = JSON.stringify(this._numberOptions);
  }
}

class NumberOptions {

  constructor(serializedOptions: string) {
    if (!serializedOptions) return;
    let obj = JSON.parse(serializedOptions);
    this.min = obj.min;
    this.max = obj.max;
    this.step = obj.step;
  }

  public min: number;
  public max: number;
  public step: number;
}
