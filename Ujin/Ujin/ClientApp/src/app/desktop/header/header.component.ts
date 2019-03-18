import { Component, OnInit } from '@angular/core';
import { LocaleService } from 'angular-l10n';
import { languages } from '../../configs/localization.config';

@Component({
  selector: 'app-desktop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  public likeButtonsVisible: boolean = false;

  constructor(private _locale: LocaleService) { }

  ngOnInit() {
  }

  likeButtonsHover() {
    this.likeButtonsVisible = true;
  }

  likeButtonsLeave() {
    this.likeButtonsVisible = false;
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
  }

}
