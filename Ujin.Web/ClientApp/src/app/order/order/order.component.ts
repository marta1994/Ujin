import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ModelInfo } from 'src/app/model/models';
import { ModelService } from 'src/app/services/model.service';
import { SeoService } from 'src/app/services/seo.service';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'src/app/core/lang/lang.service';
import { ArrayService } from 'src/app/services/array.service';
import { OrderService, User } from 'src/app/services/order.service';
import { timer, Observable, Subscription } from 'rxjs';
import { StringProperty } from 'src/app/services/property';
import { GaService } from 'src/app/google-analytics/ga.service';
import { EventCategory, OrderPageEvents } from 'src/app/google-analytics/events';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.less']
})
export class OrderComponent implements OnInit {

    private _products: ProductCount[];

    public user: User = new User();
    public validationEnabled: boolean = false;
    public showError: boolean = false;
    public timer: Observable<number> = timer(5000, 5000);
    public mainErrorInterval: Subscription;

    constructor(
        private _cartService: CartService,
        private _modelService: ModelService,
        private _seoService: SeoService,
        private _langService: LangService,
        private _arrService: ArrayService,
        private _orderService: OrderService,
        private _translateService: TranslateService,
        private _gaService: GaService) { }

    public get products(): ProductCount[] {
        return this._products;
    }

    public get totalPrice(): number {
        let res = 0;
        this._products.forEach(p => res += p.totalPrice);
        return res;
    }

    public get catalogLink(): string {
        return `/${this._translateService.currentLang}/catalog`;
    }

    ngOnInit() {
        this._seoService.preventIndex();
        this._translateService.get("forms.order.tittle")
            .subscribe(res =>
                this._seoService.updateTitle(res));
        this._seoService.updateOgUrl("place-order");
        this._seoService.updateOgImage();

        this.initProducts();
    }

    private initProducts() {
        var cartSkus = this._cartService.products;
        if (!cartSkus) return;
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


    public get userProps(): StringProperty[] {
        return Object.keys(this.user.properties).map(p => this.user.properties[p])
            .filter(p => (p as StringProperty) != null).map(p => p as StringProperty);
    }

    public removeAllBySku(sku: string) {
        this._cartService.removeAllBySku(sku);
        this._arrService.removeByCond(this._products, p => p.sku === sku);
    }

    public placeOrder() {
        this._gaService.sendEvent(EventCategory.OrderPage, OrderPageEvents.PlaceOrderClick, JSON.stringify(this.user.getJson()));
        this._orderService.makeAnOrder(this.user, this.products.map(p => { return { sku: p.sku, number: p.count } }), this.totalPrice)
            .then(res => {
                if (res === false) {
                    this.orderErrorCase();
                    return;
                }
                this._orderService.recentOrder = { price: this.totalPrice, userEmail: this.user.email };
                this._cartService.clearCart();
                this._langService.navigateTo('thank-you');
            },
                () => this.orderErrorCase())
            .catch(() => this.orderErrorCase());
    }

    private showMainError() {
        this.showError = true;
        if (this.mainErrorInterval) {
            this.mainErrorInterval.unsubscribe();
            this.mainErrorInterval = undefined;
        }
        this.mainErrorInterval = this.timer.subscribe(() => {
            this.showError = false;
            this.mainErrorInterval.unsubscribe();
            this.mainErrorInterval = undefined;
        });
    }

    private orderErrorCase() {
        this.validationEnabled = true;
        this.showMainError();
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
