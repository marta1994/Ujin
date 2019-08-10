import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { JewelryModel, ModelInfo } from '../models';
import { ClipboardService } from 'src/app/services/clipboard.service';
import { TranslateService } from '@ngx-translate/core';
import { SeoService } from 'src/app/services/seo.service';
import { CartService } from 'src/app/services/cart.service';
import { ModelService } from 'src/app/services/model.service';
import { LangService } from 'src/app/core/lang/lang.service';
import { GaService } from 'src/app/google-analytics/ga.service';
import { EventCategory, ModelPageEvents } from 'src/app/google-analytics/events';

@Component({
  selector: 'app-model-page',
  templateUrl: './model-page.component.html',
  styleUrls: ['./model-page.component.less']
})
export class ModelPageComponent implements OnInit {

  public model: JewelryModel;

  public modelInfo: ModelInfo;

  public modelIdentifier: string;

  public modelSku: string;

  public currentImages: string[];

  constructor(
    private _modelService: ModelService,
    private _activatedRoute: ActivatedRoute,
    private _clipboardService: ClipboardService,
    private _seoService: SeoService,
    private _translateService: TranslateService,
    private _cartService: CartService,
    private _router: Router,
    private _langService: LangService,
    private _gaService: GaService
  ) {
    this._activatedRoute.queryParams.subscribe(queryParams => {
      this.init();
    });
    this._activatedRoute.params.subscribe(routeParams => {
      this.init();
    });
  }

  ngOnInit() {
  }

  private init() {
    let sku = this._activatedRoute.snapshot.queryParamMap.get('sku');
    let identifier = this._activatedRoute.snapshot.params['id'];
    if ((this.modelIdentifier || "").toLowerCase() === (identifier || "").toLowerCase() &&
      (this.modelSku || "").toLowerCase() === (sku || "").toLowerCase())
      return;
    this._modelService.loadModel(identifier, sku).then(model => {
      this.model = model;
      this.modelIdentifier = model.identifier;
      this.modelSku = model.sku;
      this.loadSkuInfo();
    },
      err =>
        sku ? this._langService.navigateTo(`model/${identifier}`) : this._langService.navigateTo(''));
  }

  public modelChanged() {
    const queryParams: Params = { sku: this.model.sku };
    this.modelSku = this.model.sku;
    this.loadSkuInfo();

    this._router.navigate(
      [],
      {
        relativeTo: this._activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: "merge",
      });
  }

  private loadSkuInfo() {
    Promise.all([
      this._modelService.loadModelInfo(this.modelSku),
      this._modelService.loadImageSrcs(this.modelSku)
    ]).then(res => {
      this.modelInfo = res[0];
      this.currentImages = res[1];
      this.updateMeta();
    });
  }

  private updateMeta() {
    this._translateService.get(this.model.nameKey)
      .subscribe(res => {
        this._seoService.updateTitle(res);
      });    
    this._seoService.updateOgImage(this.getCurrentImage());
    this._seoService.updateOgUrl(this.getCurrentStandardUrl());
  }

  private getCurrentStandardUrl() {
    const urlTree = this._router.parseUrl(this._router.url);
    const urlWithoutParams = urlTree.root.children['primary'].segments.map(it => it.path).join('/');
    return `${urlWithoutParams}?sku=${this.modelSku}`;
  }

  private getCurrentImage(): string {
    if (!this.model.skuDescriptions || this.model.skuDescriptions.length == 0) return null;
    var currMin = this._modelService.getDistBetweenSku(this.modelSku, this.model.skuDescriptions[0].sku);
    var minInd = 0;
    this.model.skuDescriptions.forEach((sk, ind) => {
      var skDist = this._modelService.getDistBetweenSku(this.modelSku, sk.sku);
      if (skDist < currMin) {
        currMin = skDist;
        minInd = ind;
      }
    });
    return "assets/images/sku/" + this.model.skuDescriptions[minInd].images[0];
  }

  public placeOrder() {
    this._cartService.addToCart(this.modelSku);
    this._langService.navigateTo("place-order");
    this._gaService.sendEvent(EventCategory.ModelPage, ModelPageEvents.OrderClick);
  }

  public copyLink() {
    var url = window.location.href;
    this._clipboardService.copyToClipboard(url);
    this._gaService.sendEvent(EventCategory.ModelPage, ModelPageEvents.CopyLinkClick);
  }
}
