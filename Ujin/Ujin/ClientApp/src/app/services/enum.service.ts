import { Injectable } from '@angular/core';

@Injectable()
export class EnumService {

  constructor() { }

  private getStrKeyIntValueObj(givenEnum: object): object {
    var res = {};
    for (let key in givenEnum) {
      if (isNaN(+key) && !isNaN(+givenEnum[key])) {
        res[key] = givenEnum[key];
      }
    }
    return res;
  }

  public getEnumNames(givenEnum: object): string[] {
    givenEnum = this.getStrKeyIntValueObj(givenEnum);
    return Object.keys(givenEnum);
  }

  public getEnumStrKeyIntValues(givenEnum: object): EnumKeyValue[] {
    givenEnum = this.getStrKeyIntValueObj(givenEnum);
    return Object.keys(givenEnum).map(k => {
      return {
        key: k,
        value: givenEnum[k]
      };
    });
  }

  public getEnumStrKeyIntValuesLowerCase(givenEnum: object): EnumKeyValue[] {
    givenEnum = this.getStrKeyIntValueObj(givenEnum);
    return Object.keys(givenEnum).map(k => {
      var keyLower = k[0].toLowerCase() + k.substring(1);
      return {
        key: keyLower,
        value: givenEnum[k]
      };
    });
  }
}

export interface EnumKeyValue {
  key: string;
  value: string | number;
}
