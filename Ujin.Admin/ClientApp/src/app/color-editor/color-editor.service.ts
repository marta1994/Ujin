import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ColorEditorService {

  private _colorsPromice: Promise<Color[]>;

  constructor(private _api: ApiService) { }

  public loadColors(): Promise<Color[]> {
    if (this._colorsPromice)
      return this._colorsPromice;
    this._colorsPromice = new Promise((resolve, reject) =>
      this._api.loadData<Color[]>(`api/Color/Colors`)
        .subscribe(
        g => resolve(g.map(gs => new Color(gs))),
          err => reject(err)));
    return this._colorsPromice;
  }

  public saveColors(colors: Color[]): Promise<any> {
    return new Promise((resolve, reject) =>
      this._api.postData(`api/Color/SaveColors`, colors)
        .subscribe(
          () => resolve(true),
          err => reject(err)));
  }
}

export class Color {

  constructor(color: Color) {
    this.nameKey = color.nameKey;
    this.id = color.id;
    this.colorHexCode = color.colorHexCode;
  }

  public id: number;
  public nameKey: string;
  public colorHexCode: string;
}
