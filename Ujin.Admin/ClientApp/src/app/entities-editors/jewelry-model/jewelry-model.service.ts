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
                .then(
                    g => resolve(g.map(gs => new JewelryModel(gs))),
                    err => reject(err)));
        return this._jewelryModelsPromise;
    }

    public loadJewelryModel(id: number): Promise<JewelryModel> {
        return new Promise<JewelryModel>((resolve, reject) =>
            this._api.loadData<JewelryModel>(`api/JewelryModel/JewelryModelById/?id=${id}`)
                .then(
                    jm => resolve(new JewelryModel(jm)),
                    error => reject(error)));
    }

    public saveJewelryModel(jewelryModel: JewelryModel): Promise<any> {
        return new Promise((resolve, reject) =>
            this._api.postData(`api/JewelryModel/SaveJewelryModel`, jewelryModel)
                .then(
                    () => resolve(true),
                    err => reject(err)));
    }

    public enableModel(modelId: number): Promise<any> {
        return new Promise((resolve, reject) =>
            this._api.postData(`api/JewelryModel/EnableModel`, modelId)
                .then(
                    () => resolve(true),
                    err => reject(err)));
    }

    public disableModel(modelId: number): Promise<any> {
        return new Promise((resolve, reject) =>
            this._api.postData(`api/JewelryModel/DisableModel`, modelId)
                .then(
                    () => resolve(true),
                    err => reject(err)));
    }

    public updateModelSkuEnabledState(modelId: number): Promise<any> {
        return new Promise((resolve, reject) =>
            this._api.postData(`api/SkuData/UpdateModelSkusEnabledState`, modelId)
                .then(
                    () => resolve(true),
                    err => reject(err)));
    }

    public loadAllTags(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) =>
            this._api.loadData<string[]>(`api/JewelryModel/LoadAllTags`)
                .then(
                    tags => resolve(tags),
                    error => reject(error)));
    }
}
