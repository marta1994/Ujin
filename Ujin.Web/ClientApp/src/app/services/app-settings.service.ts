import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private _termsPromise: Promise<Terms>;

  private _socialPromise: Promise<SocialRefs>;

  constructor(private _api: ApiService) { }

  public loadTerms(): Promise<Terms> {
    if (this._termsPromise)
      return this._termsPromise;
    this._termsPromise = new Promise((resolve, reject) =>
      this._api.loadData<Terms>(`api/AppSettings/Terms`)
        .then(
          g => resolve(g),
          err => reject(err)));
    return this._termsPromise;
  }

  public loadSocialRefs(): Promise<SocialRefs> {
    if (this._socialPromise) return this._socialPromise;
    this._socialPromise = new Promise((resolve, reject) =>
      this._api.loadData<SocialRefs>('api/AppSettings/SocialReferences')
        .then(res => {
          resolve(res);
        },
          err => reject(err)));
    return this._socialPromise;
  }
}

export class Terms {
    skuSeparator: string;
    pathSeparator: string;
    exprOpen: string;
    exprClose: string;
}

export interface SocialRefs {
  facebook: string;
  instagram: string;
  pinterest: string;
  selfHost: string;
  facebookAppId: string;
  phones: string[];
  email: string;
  discountHref: string;
}

