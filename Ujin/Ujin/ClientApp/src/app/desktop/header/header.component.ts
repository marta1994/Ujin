import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { LocaleService } from 'angular-l10n';
import { languages } from '../../configs/localization.config';
import { HeaderGaService } from '../../googleAnalytics/header-ga.service';
import { SocialService } from '../../services/social.service';

@Component({
  selector: 'app-desktop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  public languages: { name: string, code: string }[];

  public discountHref: string;

  constructor(
    private _locale: LocaleService,
    private socialService: SocialService,
    private gaService: HeaderGaService) {
    this.languages = languages.length <= 1 ? [] : languages.map(l => {
      return {
        name: l.displayName,
        code: l.code
      };
    });
  }

  ngOnInit() {
    this.socialService.loadSocialRefs().subscribe((res) => {
      this.discountHref = res.discountHref;
    });
  }

  ngAfterViewInit() {
    this.gaService.registerEvents();
  }

  ngOnDestroy() {
    this.gaService.dispose();
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
