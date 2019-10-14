import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private _catModelsPromise: Promise<ICatalogModel[]>;

  constructor(private _api: ApiService) { }

  public loadCatalogModels(): Promise<ICatalogModel[]> {
    if (this._catModelsPromise != null) return this._catModelsPromise;
    this._catModelsPromise = new Promise<ICatalogModel[]>((resolve, reject) => {
      this._api.loadData<ICatalogModel[]>('api/JewelryModel/GetCatalogModels')
        .then(res => resolve(res),
          err => reject(err));
    });
    return this._catModelsPromise;
  }
}

export interface ICatalogModel {
  nameKey: string;
  imagePath: string;
  identifier: string;
}