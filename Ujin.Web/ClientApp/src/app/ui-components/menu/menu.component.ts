import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

  @Output()
  public menuCloseActionHappened: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _translateService: TranslateService) { }

  ngOnInit() {
  }

  public get catalogLink(): string {
    return `/${this._translateService.currentLang}/catalog`;
  }

  public actionHappened() {
    this.menuCloseActionHappened.emit();
  }

  public goToContacts() {
    let el = document.getElementById("contacts");
    el.scrollIntoView();
    this.actionHappened();
  }
}
