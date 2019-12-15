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
    sku: string;
    modelIdentifier: string;
    imagePath: string;
    price: number;
    displayNameParts: string[];
    descriptionParts: string[];
    tags: string[];
    productLabel: number;
}

export enum ProductLabel {
    TopSells = 1,
    NewProduct = 2
}
