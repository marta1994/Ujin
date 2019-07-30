import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ModelInfo } from 'src/app/model/models';
import { ModelService } from 'src/app/services/model.service';
import { SeoService } from 'src/app/services/seo.service';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'src/app/core/lang/lang.service';
import { ArrayService } from 'src/app/services/array.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {

  private _products: ProductCount[];

  constructor(
    private _cartService: CartService,
    private _modelService: ModelService,
    private _seoService: SeoService,
    private _langService: LangService,
    private _arrService: ArrayService,
    private _translateService: TranslateService) { }

  public get products(): ProductCount[] {
    return this._products;
  }

  public get totalPrice(): number {
    let res = 0;
    this._products.forEach(p => res += p.totalPrice);
    return res;
  }

  ngOnInit() {
    this._seoService.preventIndex();
    this._translateService.get("forms.order.tittle")
      .subscribe(res =>
        this._seoService.updateTitle(res));
    this._seoService.updateOgUrl("place-order");
    this._seoService.updateOgImage("assets/images/ujin_logo_white_text.png");
   
    if (!this.initProducts())
      this._langService.navigateTo("wrong-path");
  }

  private initProducts(): boolean {
    var cartSkus = this._cartService.products;
    if (!cartSkus) return false;
    this._products = [];
    for (let sku in cartSkus) {
      this._products.push(new ProductCount(sku, cartSkus[sku].count));
    }
    if (this._products.length == 0) return false;
    var modelInfoPromises: Promise<ModelInfo>[] = [];
    var imgPromises: Promise<string[]>[] = [];
    this._products.forEach(p => {
      modelInfoPromises.push(this._modelService.loadModelInfo(p.sku));
      imgPromises.push(this._modelService.loadImageSrcs(p.sku));
    });
    Promise.all([Promise.all(modelInfoPromises), Promise.all(imgPromises)])
      .then(res => {
        for (var i = 0; i < this._products.length; ++i) {
          this._products[i].images = res[1][i];
          this._products[i].model = res[0][i];
        }
      });
    return true;
  }

  public removeAllBySku(sku: string) {
    this._cartService.removeAllBySku(sku);
    this._arrService.removeByCond(this._products, p => p.sku === sku);
  }
}

class ProductCount {

  constructor(sku: string, count: number) {
    this.count = count;
    this.sku = sku;
  }

  public sku: string;
  public model: ModelInfo;
  public images: string[];
  public count: number;

  public get totalPrice(): number {
    return this.model ? this.count * this.model.price : 0;
  }
}
