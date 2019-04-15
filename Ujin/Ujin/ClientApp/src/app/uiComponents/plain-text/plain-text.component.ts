import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OnAction } from '../popup/OnAction';
import { TranslationService } from 'angular-l10n';

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

  public text;

  constructor(private translation: TranslationService) { }

  ngOnInit() {
    this.text = this.translation.translate(this.textKey);
  }

}
