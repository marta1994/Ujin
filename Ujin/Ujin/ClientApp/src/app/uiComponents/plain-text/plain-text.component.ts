import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OnAction } from '../popup/OnAction';

@Component({
  selector: 'app-plain-text',
  templateUrl: './plain-text.component.html',
  styleUrls: ['./plain-text.component.less']
})
export class PlainTextComponent implements OnInit, OnAction {

  @Output()
  public actionHappened: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  public textKey: string = "";

  constructor() { }

  ngOnInit() {
  }

}
