import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { JewelryModel } from './models';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

    constructor(private _api: ApiService) { }

    public loadModel(identifier: string, sku?: string): Promise<JewelryModel> {
        return new Promise((resolve, reject) =>
            this._api.loadData<JewelryModel>(`api/JewelryModel/LoadModelByIdentifier/?identifier=${identifier}&sku=${sku}`)
                .then(
                    m => resolve(new JewelryModel(m)),
                    err => reject(err)));
    }
}


