import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { AppSettingsService, Terms } from 'src/app/services/app-settings.service';

@Component({
  selector: 'app-simple-hint-input',
  templateUrl: './simple-hint-input.component.html',
  styleUrls: ['./simple-hint-input.component.less']
})
export class SimpleHintInputComponent implements OnInit {

  @Input("hintSource")
  public inputHintSource: IHintSource[];

  private _value: string;
  public get value(): string {
    return this._value;
  }
  @Input()
  public set value(val: string) {
    if (val === this._value) return;
    this._value = val;
    this.valueChange.emit(this._value);
  }

  @Output()
  public valueChange: EventEmitter<string> = new EventEmitter<string>();

  public isEditMode: boolean = false;

  private _terms: Terms;

  public hintSource: HintSource[];

  public groups: TextGroup[] = [];

  public InputType = InputType;

  constructor(_appSettings: AppSettingsService) {
    _appSettings.loadTerms().then(res => {
      this._terms = res;
      this.tryInit();
    });
  }

  ngOnInit() {
  }

  public switchEditMode(): void {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.tryInit();
    }
  }

  public trackGroups(index: number): any {
    return index;
  }

  private appendSimpleText(text: string) {
    if (this.groups.length && this.groups[this.groups.length - 1].inputType == InputType.SimpleText) {
      this.groups[this.groups.length - 1].text += text;
    } else {
      this.groups.push(new TextGroup(InputType.SimpleText, text));
    }
  }

  private findInHintTree(currWord: string): HintSource {
    let splitted = currWord.split(this._terms.pathSeparator);
    let currSource = this.hintSource;
    for (let i = 0; i < splitted.length; ++i) {
      let src = currSource.find(s => s.name == splitted[i]);
      if (!src) return null;
      if (i == splitted.length - 1) return src;
      currSource = src.children;
    }
    return null;
  }

  private tryInit() {
    if (!this.value || !this.inputHintSource || !this._terms)
      return;
    this.hintSource = this.inputHintSource.map(hs => new HintSource(hs, this._terms));

    let textState = InputType.SimpleText;
    let currWord = "";
    this.groups = [];

    for (let i = 0; i < this.value.length; ++i) {

      if (textState == InputType.SimpleText && this.value[i] === this._terms.exprOpen) {
        textState = InputType.HintInput;
        this.appendSimpleText(currWord);
        currWord = "";
        continue;
      }

      if (textState == InputType.HintInput && this.value[i] == this._terms.exprClose) {
        textState = InputType.SimpleText;
        let src = this.findInHintTree(currWord);
        if (src) {
          this.groups.push(new TextGroup(InputType.HintInput, "", src));
        } else {
          this.appendSimpleText(this._terms.exprOpen + currWord + this._terms.exprClose);
        }
        currWord = "";
        continue;
      }

      currWord += this.value[i];
    }

    if (currWord) {
      this.appendSimpleText(currWord);
    }
  }

}

export interface IHintSource {
  name: string;
  children?: IHintSource[];
}

export class HintSource implements IHintSource {

  private _terms: Terms;

  constructor(hintSource: IHintSource, terms: Terms, parent?: HintSource) {
    this.name = hintSource.name;
    this._terms = terms;
    this.fullName = (parent ? parent.fullName + this._terms.pathSeparator : "") + this.name;
    this.children = hintSource.children ?
      hintSource.children.map(ch => new HintSource(ch, terms, this)) : [];
    this.parent = parent;
  }

  public name: string;
  public children?: HintSource[];

  public parent: HintSource;
  public fullName: string;
}

enum InputType {
  SimpleText = 1,
  HintInput = 2
}

class TextGroup {

  constructor(inputType: InputType, text: string, hintedItem?: HintSource) {
    this.inputType = inputType;
    this.text = text;
    this.hintedItem = hintedItem;
  }

  public inputType: InputType;
  public text: string;
  public hintedItem: HintSource;
}
