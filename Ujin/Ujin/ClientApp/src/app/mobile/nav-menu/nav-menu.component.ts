import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocaleService } from 'angular-l10n';
import { languages } from '../../configs/localization.config';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.less']
})
export class NavMenuComponent implements OnInit {

  @Output()
  public menuCloseActionHappened: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _locale: LocaleService) { }

  ngOnInit() {
  }

  public get languages(): { name: string, code: string }[] {
    return languages.map(l => {
      return {
        name: l.displayName,
        code: l.code
      };
    });
  }

  public isLangSelected(lang: { name: string, code: string }): boolean {
    return this._locale.getCurrentLanguage() === lang.code;
  }

  public setLanguage(lang: { name: string, code: string }) {
    if (this.isLangSelected(lang)) {
      return;
    }
    this._locale.setCurrentLanguage(lang.code);
    this.menuCloseActionHappened.emit();
  }
}
