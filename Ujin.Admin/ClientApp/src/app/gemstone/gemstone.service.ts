import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class GemstoneService {

  private _gemSourcesPromice: Promise<GemSource[]>;

  constructor(private _api: ApiService) { }

  public loadGemSources(): Promise<GemSource[]> {
    if (this._gemSourcesPromice)
      return this._gemSourcesPromice;
    this._gemSourcesPromice = new Promise((resolve, reject) =>
      this._api.loadData<GemSource[]>('api/Gemstone/GemSources')
        .subscribe(
          g => resolve(g.map(gs => new GemSource(gs))),
          err => reject(err)));
    return this._gemSourcesPromice;
  }

  public saveGemSources(gemSources: GemSource[]): Promise<any> {
    return new Promise((resolve, reject) =>
      this._api.postData('api/Gemstone/SaveGemSources', gemSources)
        .subscribe(
          () => resolve(true),
          err => reject(err)));
  }
}

export class GemSource {

  constructor(gemSrc: GemSource) {
    this.nameKey = gemSrc.nameKey;
    this.id = gemSrc.id;
  }

  public nameKey: string;
  public id: number;
}
