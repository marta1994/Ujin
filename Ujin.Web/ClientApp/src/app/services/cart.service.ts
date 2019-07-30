import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private static cartKey: string = "cart_products";

  constructor(private _localStorageService: LocalStorageService) { }

  public get products(): { [key: string]: ICartProduct; } {
    return this.cartProducts;
  }

  private get cartProducts(): { [key: string]: ICartProduct; } {
    let cart = this._localStorageService.get<{ [key: string]: ICartProduct; }>(CartService.cartKey);
    return cart ? cart : {};
  }

  private set cartProducts(val: { [key: string]: ICartProduct; }) {
    this._localStorageService.set(CartService.cartKey, val);
  }

  public addToCart(sku: string) {
    var cartProds = this.cartProducts;
    if (cartProds[sku] != null) cartProds[sku].count++;
    else cartProds[sku] = { sku: sku, count: 1 };
    this.cartProducts = cartProds;
  }

  public removeFromCart(sku: string) {
    var cartProds = this.cartProducts;
    if (cartProds[sku] == null) return;
    cartProds[sku].count--;
    if (cartProds[sku].count == 0) cartProds[sku] = undefined;
    this.cartProducts = cartProds;
  }

  public removeAllBySku(sku: string) {
    var cartProds = this.cartProducts;
    if (cartProds[sku] == null) return;
    cartProds[sku] = undefined;
    this.cartProducts = cartProds;
  }

  public clearCart() {
    this.cartProducts = {};
  }
}

export interface ICartProduct {
  sku: string;
  count: number;
}
