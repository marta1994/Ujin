import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { JewelryModel, ModelInfo } from './models';
import { AppSettingsService } from '../services/app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

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
          m => resolve(new JewelryModel(m[0], m[1].skuSeparator)),
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
}


