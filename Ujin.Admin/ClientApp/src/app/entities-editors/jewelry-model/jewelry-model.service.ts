import { Injectable } from '@angular/core';
import { JewelryModel } from './models';
import { ApiService } from 'src/app/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class JewelryModelService {

  private _jewelryModelsPromise: Promise<JewelryModel[]>;

  constructor(private _api: ApiService) { }

  public loadJewelryModels(): Promise<JewelryModel[]> {
    if (this._jewelryModelsPromise)
      return this._jewelryModelsPromise;
    this._jewelryModelsPromise = new Promise((resolve, reject) =>
      this._api.loadData<JewelryModel[]>(`api/JewelryModel/JewelryModels`)
        .subscribe(
          g => resolve(g.map(gs => new JewelryModel(gs))),
          err => reject(err)));
    return this._jewelryModelsPromise;
  }

  public loadJewelryModel(id: number): Promise<JewelryModel> {
    return new Promise<JewelryModel>((resolve, reject) =>
      this._api.loadData<JewelryModel>(`api/JewelryModel/JewelryModelById/?id=${id}`)
        .subscribe(
          jm => resolve(new JewelryModel(jm)),
          error => reject(error)));
  } 

  public saveJewelryModel(jewelryModel: JewelryModel): Promise<any> {
    return new Promise((resolve, reject) =>
      this._api.postData(`api/JewelryModel/SaveJewelryModel`, jewelryModel)
        .subscribe(
          () => resolve(true),
          err => reject(err)));
  }
}
