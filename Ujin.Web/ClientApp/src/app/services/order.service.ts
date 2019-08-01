import { Injectable } from '@angular/core';
import { IProperty, StringProperty } from './property';
import { ApiService } from '../api/api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private static justMadeOrderProp: string = "justMadeOrder";

  constructor(
    private _api: ApiService,
    private _localStorageService: LocalStorageService) { }

  public makeAnOrder(user: User, products: IOrderProduct[], price: number): Promise<any> {
    if (!user.isValid || products.length == 0)
      return new Promise((resolve, reject) => resolve(false));
    var request = {
      user: user.getJson(),
      price: price,
      products: products
    };
    return new Promise((resolve, reject) => {
      this._api.postData("api/Order/CreateOrder", request)
        .then(() => resolve(true),
          err => reject(err));
    });
  }

  public get justMadeOrder(): boolean {
    return this._localStorageService.get<boolean>(OrderService.justMadeOrderProp);
  }

  public set justMadeOrder(val: boolean) {
    this._localStorageService.set(OrderService.justMadeOrderProp, val);
  }
}

export interface IOrderProduct {
  sku: string;
  number: number;
}

export class User {

  private static nameProp: string = "name";
  private static phoneProp: string = "phone";
  private static emailProp: string = "email";

  private _properties: { [propName: string]: IProperty } = {};

  constructor() {
    this._properties[User.nameProp] = new StringProperty(User.nameProp, 'forms.order.enterName', /.+/i, 1);
    this._properties[User.phoneProp] =
      new StringProperty(User.phoneProp, 'forms.order.enterPhone', /(^\+380[0-9]{9}$)|(^0[0-9]{9}$)|(^[0-9]{9}$)/i);
    (<StringProperty>this._properties[User.phoneProp]).inputType = "tel";
    this._properties[User.emailProp] =
      new StringProperty(User.emailProp, 'forms.order.enterEmail', /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  }

  public get properties(): { [propName: string]: IProperty } {
    return this._properties;
  }

  public get name(): string {
    return this._properties[User.nameProp].value;
  }

  public set name(val: string) {
    this._properties[User.nameProp].value = val;
  }

  public get phone(): string {
    return this._properties[User.phoneProp].value;
  }

  public set phone(val: string) {
    this._properties[User.phoneProp].value = val;
  }

  public get email(): string {
    return this._properties[User.emailProp].value;
  }

  public set email(val: string) {
    this._properties[User.emailProp].value = val;
  }

  public get isValid(): boolean {
    for (let prop in this._properties) {
      if (!this._properties[prop].isValid) return false;
    }
    return true;
  }

  public getJson(): any {
    let res = {};
    for (let prop in this._properties) {
      res[prop] = this._properties[prop].value;
    }
    return res;
  }
}
