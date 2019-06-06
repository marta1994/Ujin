import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayService {

  constructor() { }

  public deleteItem<T>(array: T[], item: T): T {
    let itemIndex = array.indexOf(item);
    if (itemIndex < 0) return null;
    let arrItem = array[itemIndex];
    array.splice(itemIndex, 1);
    return arrItem;
  }
}
