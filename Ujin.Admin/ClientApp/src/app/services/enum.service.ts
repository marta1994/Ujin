import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnumService {

  constructor() { }

  public getNameValues<T>(enumType: T): NameValue<T[keyof T]>[] {
    let result = [];
    for (let propKey in enumType) {
      if (!isNaN( + propKey)) {
        result.push(new NameValue(<string>(<any>enumType[propKey]), +propKey));
      }
    }
    return result;
  }
}

export class NameValue<T> {

  constructor(name: string, value: T) {
    this.name = name;
    this.value = value;
  }

  public name: string;
  public value: T;
}
