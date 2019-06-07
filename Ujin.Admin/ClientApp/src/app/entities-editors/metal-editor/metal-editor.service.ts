import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class MetalEditorService {

  private _metalsPromise: Promise<Metal[]>;

  constructor(private _api: ApiService) { }

  public loadMetals(): Promise<Metal[]> {
    if (this._metalsPromise)
      return this._metalsPromise;
    this._metalsPromise = new Promise((resolve, reject) =>
      this._api.loadData<Metal[]>(`api/Metal/Metals`)
        .then(
        g => resolve(g.map(gs => new Metal(gs))),
          err => reject(err)));
    return this._metalsPromise;
  }

  public saveMetals(metals: Metal[]): Promise<any> {
    return new Promise((resolve, reject) =>
      this._api.postData(`api/Metal/SaveMetals`, metals)
        .then(
          () => resolve(true),
          err => reject(err)));
  }
}

export class Metal {

  constructor(metal: Metal) {
    this.nameKey = metal.nameKey;
    this.id = metal.id;
    this.pricePerGram = metal.pricePerGram;
  }

  public id: number;
  public nameKey: string;
  public pricePerGram: number;
}
