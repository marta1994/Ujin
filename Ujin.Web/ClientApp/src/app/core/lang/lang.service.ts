import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  private readonly defaultLang: string = 'ua';
  private readonly allLangs: string[] = ['ua']; //, 'en'

  constructor(
    private _translate: TranslateService,
    private _router: Router) {
    _translate.setDefaultLang(this.defaultLang);
    _translate.use(this.defaultLang);
    _translate.addLangs(this.allLangs);
  }

  public get languages(): string[] {
    return this.allLangs.map(l => l);
  }

  public setLangFromRoute(lang: string) {
    if (this._translate.langs.indexOf(lang) < 0) {
      this.redirectToLang(this._translate.defaultLang);
    }
    else {
      this._translate.use(lang);
    }
  }

  public reRouteToLang(lang: string) {
    this.redirectToLang(lang);
  }

  private redirectToLang(lang: string) {
    let parsed = this._router.parseUrl(this._router.url);
    parsed.root.children.primary.segments[0].path = lang;
    var path = [parsed.root.children.primary.segments.map(s => s.path).join("/")];
    var params = { queryParams: parsed.queryParams };
    this._router.navigate(path, params);
  }

  public navigateTo(path: string) {
    let parsed = this._router.parseUrl(this._router.url);
    let lang = parsed.root.children.primary.segments[0].path;
    path = path[0] == '/' ? path : '/' + path;
    let parsedPath = this._router.parseUrl(lang + path);
    var navPath = [parsedPath.root.children.primary.segments.map(s => s.path).join("/")];
    var params = { queryParams: parsedPath.queryParams };
    this._router.navigate(navPath, params);
  }
}
