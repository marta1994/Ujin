import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GaService } from 'src/app/google-analytics/ga.service';
import { EventCategory, MenuEvents } from 'src/app/google-analytics/events';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

  @Output()
  public menuCloseActionHappened: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private _translateService: TranslateService,
    private _gaService: GaService) { }

  ngOnInit() {
  }

  public get catalogLink(): string {
    return `/${this._translateService.currentLang}/catalog`;
  }

  public catalogClick() {
    this.actionHappened();
    this._gaService.sendEvent(EventCategory.Menu, MenuEvents.CatalogClick);
  }

  public actionHappened() {
    this.menuCloseActionHappened.emit();
  }

  public goToContacts() {
    let el = document.getElementById("contacts");
    el.scrollIntoView();
    this.actionHappened();
    this._gaService.sendEvent(EventCategory.Menu, MenuEvents.ContactsClick);
  }
}
