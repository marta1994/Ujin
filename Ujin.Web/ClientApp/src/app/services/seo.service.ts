import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { AppSettingsService } from './app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  private static mainTitle: string = "Ujin jewelry";

  private _siteName: string;

  constructor(
    private _title: Title,
    private _meta: Meta,
    _appSettings: AppSettingsService) {
    _appSettings.loadSocialRefs().then(res => this._siteName = res.selfHost);
  }

  updateTitle(title: string) {
    this._title.setTitle(`${SeoService.mainTitle} | ${title}`);
    this._meta.updateTag({ property: 'og:title', content: `${SeoService.mainTitle} | ${title}` });
  }

  updateOgUrl(url: string) {
    this._meta.updateTag({ property: 'og:url', content: `${this.siteName}${url}` });
  }

  updateOgDescription(description: string) {
    this._meta.updateTag({ property: 'og:description', content: description });
  }

  updateOgImage(image: string) {
    this._meta.updateTag({ property: 'og:image', content: `${this.siteName}${image}` });
  }

  updateDescription(desc: string) {
    this._meta.updateTag({ property: 'description', content: desc });
  }

  preventIndex() {
    this._meta.updateTag({ name: 'googlebot', content: 'noindex, follow' });
  }

  private get siteName(): string {
    var res = this._siteName ? this._siteName : window.location.protocol + "//" + window.location.host;
    if (!res.endsWith('/')) res += '/';
    return res;
  }
}
