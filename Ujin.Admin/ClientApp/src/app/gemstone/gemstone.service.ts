import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class GemstoneService {

  private _entityPromices: { [key: string]: Promise<NamedEntity[]> } = { };

  constructor(private _api: ApiService) {
    this._entityPromices[GemNamedEntity.GemSource] = null;
    this._entityPromices[GemNamedEntity.GemClass] = null;
    this._entityPromices[GemNamedEntity.GemCut] = null;
  }

  public loadGemSources(entityType: GemNamedEntity): Promise<NamedEntity[]> {
    if (this._entityPromices[entityType])
      return this._entityPromices[entityType];
    this._entityPromices[entityType] = new Promise((resolve, reject) =>
      this._api.loadData<NamedEntity[]>(`api/Gemstone/${entityType}`)
        .subscribe(
        g => resolve(g.map(gs => new NamedEntity(gs))),
          err => reject(err)));
    return this._entityPromices[entityType];
  }

  public saveGemSources(gemSources: NamedEntity[], entityType: GemNamedEntity): Promise<any> {
    return new Promise((resolve, reject) =>
      this._api.postData(`api/Gemstone/Save${entityType}`, gemSources)
        .subscribe(
          () => resolve(true),
          err => reject(err)));
  }

  public loadGemstones
}

export enum GemNamedEntity {
  GemSource = "GemSources",
  GemClass = "GemClasses",
  GemCut = "GemCuts"
}

export class Gemstone {
  public id: number;
  public widthMm: number;
  public heightMm: number;
  public price: number;
  public weight: number;
  public colorId: number;
  public color: NamedEntity;
  public gemstoneClassId: number;
  public gemstoneClass: NamedEntity;
  public get gemClassName(): string {
    return this.gemstoneClass.nameKey;
  }
  public gemstoneSourceId: number;
  public gemstoneSource: NamedEntity;
  public get gemSourceName(): string {
    return this.gemstoneSource.nameKey;
  }
  public gemstoneCutId: number;
  public gemstoneCut: NamedEntity;
  public get gemCutName(): string {
    return this.gemstoneCut.nameKey;
  }
}

export class NamedEntity {

  constructor(namedEntity: NamedEntity) {
    this.nameKey = namedEntity.nameKey;
    this.id = namedEntity.id;
  }

  public nameKey: string;
  public id: number;
}
