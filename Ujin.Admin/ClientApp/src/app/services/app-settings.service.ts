import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AppSettingsService {

  private _termsPromise: Promise<Terms>;

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
}

export interface Terms {
  skuSeparator: string;
  pathSeparator: string;
  exprOpen: string;
  exprClose: string;
}
