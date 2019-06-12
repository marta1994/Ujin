import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-hint-input',
  templateUrl: './hint-input.component.html',
  styleUrls: ['./hint-input.component.less'],
})
export class HintInputComponent implements OnInit, OnChanges {

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

  @ViewChild("currenttextinput")
  public currentTextField: ElementRef;

  public hintSource: HintSource[];

  public filteredSource: HintSourceWrapper[] = [];

  public groups: TextGroup[] = [];

  public state: InputType = InputType.SimpleText;

  public InputType = InputType;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.inputHintSource && changes.inputHintSource.firstChange ||
      changes.value && changes.value.firstChange) {
      this.tryInit();
    }
  }

  public deletePress(event) {
    if (this.currentText) return;
    if (this.groups.length === 0) return;
    switch (this.groups[this.groups.length - 1].inputType) {
      case InputType.SimpleText: {
        this.state = InputType.SimpleText;
        let text = this.groups[this.groups.length - 1].text;
        text = text.substring(0, text.length - 1);
        this.currentText = text;
        this.groups.pop();
        break;
      }
      case InputType.HintInput: {
        this.state = InputType.HintInput;
        this.currentText = this.groups[this.groups.length - 1].hintedItem.fullName;
        this.groups.pop();
        break;
      }
    }
    event.preventDefault();
    this.currentTextField.nativeElement.focus();
    return;
  }

  public keyPress(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.charCode);
    switch (inputChar) {
      case Const.openBr: {
        this.openBrCase();
        event.preventDefault();
        break;
      }
      case Const.closeBr: {
        this.closeBrCase();
        event.preventDefault();
        break;
      }
    }
  }

  private openBrCase() {
    if (this.state !== InputType.SimpleText) return;
    this.appendSimpleText(this.currentText);
    this.currentText = "";
    this.state = InputType.HintInput;
    this.filterGroups(this.currentText);
    this.currentTextField.nativeElement.focus();
  }

  private closeBrCase() {
    if (this.state !== InputType.HintInput) return;
    this.state = InputType.SimpleText;
    let src = this.findInHintTree(this.currentText);
    if (src) {
      this.groups.push(new TextGroup(InputType.HintInput, "", src));
    } else {
      this.appendSimpleText(Const.openBr + this.currentText + Const.closeBr);
    }
    this.currentText = "";
    this.currentTextField.nativeElement.focus();
  }

  private _currentText = "";

  public get currentText(): string {
    return this._currentText;
  }

  public set currentText(val: string) {
    if (this.state === InputType.HintInput && val !== this._currentText) {
      this.filterGroups(val);
    }
    this._currentText = val;
    this.setValue();
  }

  private setValue() {
    this.value = this.groups.map(g => g.inputType == InputType.HintInput ?
      Const.openBr + g.hintedItem.fullName + Const.closeBr : g.text)
      .join("") + this.currentText;
  }

  public onNodeClick(node: HintSourceWrapper) {
    if (node.hintSource.children.length > 0) return;
    this.currentText = node.fullName;
    this.closeBrCase();
  }

  public filterGroups(word: string) {

    let getFiltered = (node: HintSource): HintSourceWrapper => {
      if (!word || node.fullName.indexOf(word) >= 0) {
        return new HintSourceWrapper(node, true);
      }

      let children = node.children.filter(ch => getFiltered(ch) != null);
      if (children.length == 0) return null;
      let wrapper = new HintSourceWrapper(node);
      wrapper.children = children.map(ch => new HintSourceWrapper(ch));
      return wrapper;
    }

    this.filteredSource = this.hintSource.map(g => getFiltered(g)).filter(g => g != null);
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
    let splitted = currWord.split(Const.nameSplitter);
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
    if (!this.value || !this.inputHintSource)
      return;
    this.hintSource = this.inputHintSource.map(hs => new HintSource(hs));

    let textState = InputType.SimpleText;
    let currWord = "";
    this.groups = [];

    for (let i = 0; i < this.value.length; ++i) {

      if (textState == InputType.SimpleText && this.value[i] === Const.openBr) {
        textState = InputType.HintInput;
        this.appendSimpleText(currWord);
        currWord = "";
        continue;
      }

      if (textState == InputType.HintInput && this.value[i] == Const.closeBr) {
        textState = InputType.SimpleText;
        let src = this.findInHintTree(currWord);
        if (src) {
          this.groups.push(new TextGroup(InputType.HintInput, "", src));
        } else {
          this.appendSimpleText(Const.openBr + currWord + Const.closeBr);
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

  constructor(hintSource: IHintSource, parent?: HintSource) {
    this.name = hintSource.name;
    this.fullName = (parent ? parent.fullName + Const.nameSplitter : "") + this.name;
    this.children = hintSource.children ?
      hintSource.children.map(ch => new HintSource(ch, this)) : [];
    this.parent = parent;
  }

  public name: string;
  public children?: HintSource[];

  public parent: HintSource;
  public fullName: string;
}

export class HintSourceWrapper {

  private _hintSource: HintSource;

  constructor(hintSource: HintSource, copyChildren: boolean = false) {
    this._hintSource = hintSource;
    if (copyChildren) {
      this.children = hintSource.children.map(ch => new HintSourceWrapper(ch, true));
    }
  }

  public get hintSource(): HintSource {
    return this._hintSource;
  }

  public get name(): string {
    return this._hintSource.name;
  }

  public get fullName(): string {
    return this._hintSource.fullName;
  }

  public children: HintSourceWrapper[];
}

enum InputType {
  SimpleText = 1,
  HintInput = 2
}

enum Const {
  nameSplitter = ".",
  openBr = "{",
  closeBr = "}",
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
