import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { ColorEditorService, Color } from '../color-editor/color-editor.service';

@Injectable({
  providedIn: 'root'
})
export class GemstoneService {

  private _entityPromises: { [key: string]: Promise<NamedEntity[]> } = {};

  private _gemstonePromise: Promise<Gemstone[]>;

  private _filledGemstonePromise: Promise<Gemstone[]>;

  constructor(private _api: ApiService, private _colorService: ColorEditorService) {
    this._entityPromises[GemNamedEntity.GemSource] = null;
    this._entityPromises[GemNamedEntity.GemClass] = null;
    this._entityPromises[GemNamedEntity.GemCut] = null;
  }

  public loadGemNamedEntities(entityType: GemNamedEntity): Promise<NamedEntity[]> {
    if (this._entityPromises[entityType])
      return this._entityPromises[entityType];
    this._entityPromises[entityType] = new Promise((resolve, reject) =>
      this._api.loadData<NamedEntity[]>(`api/Gemstone/${entityType}`)
        .then(
        g => resolve(g.map(gs => new NamedEntity(gs))),
          err => reject(err)));
    return this._entityPromises[entityType];
  }

  public saveGemNamedEntities(gemSources: NamedEntity[], entityType: GemNamedEntity): Promise<any> {
    return new Promise((resolve, reject) =>
      this._api.postData(`api/Gemstone/Save${entityType}`, gemSources)
        .then(
          () => resolve(true),
          err => reject(err)));
  }

  public loadPlainGemstones(): Promise<Gemstone[]> {
    if (this._gemstonePromise != null)
      return this._gemstonePromise;
    this._gemstonePromise = new Promise((resolve, reject) => {
      this._api.loadData<IGemstone[]>("api/Gemstone/Gemstones").then(
        g => resolve(g.map(gs => new Gemstone(gs))),
        err => reject(err))
    });
    return this._gemstonePromise;
  }

  public loadGemstones(): Promise<Gemstone[]> {
    if (this._filledGemstonePromise != null)
      return this._filledGemstonePromise;
    this._filledGemstonePromise = new Promise((resolve, reject) => {
      Promise.all([
        this.loadGemNamedEntities(GemNamedEntity.GemClass),
        this.loadGemNamedEntities(GemNamedEntity.GemCut),
        this.loadGemNamedEntities(GemNamedEntity.GemSource),
        this._colorService.loadColors(),
        this.loadPlainGemstones()])
        .then(res => {
          res[4].forEach(g => this.fillGemstone(g, res[3], res[0], res[1], res[2]));
          resolve(res[4]);
        })
        .catch(err => reject(err));
    });
    return this._filledGemstonePromise;
  }

  public fillGemstone(
    gemstone: Gemstone,
    colors: Color[],
    gemClasses: NamedEntity[],
    gemCuts: NamedEntity[],
    gemSources: NamedEntity[]) {
    gemstone.color = colors.find(c => c.id === gemstone.colorId);
    gemstone.gemstoneClass = gemClasses.find(c => c.id === gemstone.gemstoneClassId);
    gemstone.gemstoneCut = gemCuts.find(c => c.id === gemstone.gemstoneCutId);
    gemstone.gemstoneSource = gemSources.find(c => c.id === gemstone.gemstoneSourceId);
  }

  public saveGemstones(gemstones: Gemstone[]): Promise<any> {
    return new Promise((resolve, reject) =>
      this._api.postData(`api/Gemstone/SaveGemstones`, gemstones)
        .then(
          () => resolve(true),
          err => reject(err)));
  } 
}

export enum GemNamedEntity {
  GemSource = "GemSources",
  GemClass = "GemClasses",
  GemCut = "GemCuts"
}

export interface IGemstone {
  id: number;
  price: number;
  weight: number;
  widthMm: number;
  heightMm: number;
  colorId: number;
  gemstoneClassId: number;
  gemstoneCutId: number;
  gemstoneSourceId: number;
}

export class Gemstone {

  constructor(gemstone: IGemstone) {
    this.id = gemstone.id;
    this.widthMm = gemstone.widthMm;
    this.heightMm = gemstone.heightMm;
    this.price = gemstone.price;
    this.weight = gemstone.weight;

    this.colorId = gemstone.colorId;
    this.gemstoneClassId = gemstone.gemstoneClassId;
    this.gemstoneSourceId = gemstone.gemstoneSourceId;
    this.gemstoneCutId = gemstone.gemstoneCutId;
  }

  public id: number;
  public widthMm: number;
  public heightMm: number;
  public price: number;
  public weight: number;

  public colorId: number;
  public get colorName(): string {
    return this.color.nameKey;
  }
  public get colorHexCode(): string {
    return this.color.colorHexCode;
  }
  public color: Color;

  public gemstoneClassId: number;
  public get gemstoneClassName(): string {
    return this.gemstoneClass.nameKey;
  }
  public gemstoneClass: NamedEntity;

  public gemstoneSourceId: number;
  public get gemstoneSourceName(): string {
    return this.gemstoneSource.nameKey;
  }
  public gemstoneSource: NamedEntity;

  public gemstoneCutId: number;
  public get gemstoneCutName(): string {
    return this.gemstoneCut.nameKey;
  }
  public gemstoneCut: NamedEntity;
}

export class NamedEntity {

  constructor(namedEntity: NamedEntity) {
    this.nameKey = namedEntity.nameKey;
    this.id = namedEntity.id;
  }

  public nameKey: string;
  public id: number;
}
