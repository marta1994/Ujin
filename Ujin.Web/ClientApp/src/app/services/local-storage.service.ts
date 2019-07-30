import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public get<T>(key: string): T {
    return <T>JSON.parse(localStorage.getItem(key));
  }

  public set<T>(key: string, value: T) {
    var strVal = JSON.stringify(value);
    localStorage.setItem(key, strVal);
  }
}
