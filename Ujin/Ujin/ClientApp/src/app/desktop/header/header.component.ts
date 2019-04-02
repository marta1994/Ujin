import { Component, OnInit } from '@angular/core';
import { LocaleService } from 'angular-l10n';
import { languages } from '../../configs/localization.config';

@Component({
  selector: 'app-desktop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  public languages: { name: string, code: string }[];

  constructor(private _locale: LocaleService) {
    this.languages = languages.map(l => {
      return {
        name: l.displayName,
        code: l.code
      };
    });
  }

  ngOnInit() {
  }

  public isLangSelected(lang: { name: string, code: string }): boolean {
    return this._locale.getCurrentLanguage() === lang.code;
  }

  public setLanguage(lang: { name: string, code: string }) {
    if (this.isLangSelected(lang)) {
      return;
    }
    this._locale.setCurrentLanguage(lang.code);
  }

}
