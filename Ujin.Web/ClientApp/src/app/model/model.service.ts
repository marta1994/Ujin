import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { JewelryModel, ModelInfo } from './models';
import { AppSettingsService } from '../services/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private _skuSeparator: string;

  constructor(
    private _api: ApiService,
    private _appSettingsService: AppSettingsService) { }

  public loadModel(identifier: string, sku?: string): Promise<JewelryModel> {
    sku = sku || "";
    let loadModelPromise = this._api.loadData<JewelryModel>(
      `api/JewelryModel/LoadModelByIdentifier/?identifier=${identifier}&sku=${sku}`);
    let loadTermsPromise = this._appSettingsService.loadTerms();
    return new Promise((resolve, reject) =>
      Promise.all([loadModelPromise, loadTermsPromise])
        .then(
          m => {
            this._skuSeparator = m[1].skuSeparator;
            resolve(new JewelryModel(m[0], m[1].skuSeparator));
          },
          err => reject(err)));
  }

  public loadModelInfo(sku: string): Promise<ModelInfo> {
    return new Promise((resolve, reject) =>
      this._api.loadData<ModelInfo>(
        `api/JewelryModel/GetModelInfo/?sku=${sku}`)
        .then(
          m => resolve(new ModelInfo(m)),
          err => reject(err)));
  }

  public loadImageSrcs(sku: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this._api.loadData<string[]>(`api/JewelryModel/WidgetImageSrcs/?sku=${sku}`)
        .then(r => resolve(r),
          err => reject(err));
    });
  }

  public getDistBetweenSku(sku1: string, sku2: string): number {
    let currSeparated = sku2.split(this._skuSeparator);
    let comparSeparated = sku1.split(this._skuSeparator);
    if (currSeparated.length != comparSeparated.length) return 10000;
    let res = 0;
    for (let i = 0; i < currSeparated.length; ++i) {
      if (currSeparated[i] == comparSeparated[i] || !isNaN(+comparSeparated[i])) continue;
      if (currSeparated[i].indexOf("-") < 0) {
        res += 10;
        continue;
      }
      let splitted1 = currSeparated[i].split("-");
      let splitted2 = comparSeparated[i].split("-");
      for (let j = 0; j < splitted1.length; ++j) {
        if (splitted1[j] != splitted2[j]) res++;
      }
    }
    return res;
  }
}


