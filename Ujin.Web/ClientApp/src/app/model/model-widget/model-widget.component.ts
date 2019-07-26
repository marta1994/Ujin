import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ModelService } from '../model.service';
import { JewelryModel, ModelInfo } from '../models';
import { ClipboardService } from 'src/app/services/clipboard.service';

@Component({
  selector: 'app-model-widget',
  templateUrl: './model-widget.component.html',
  styleUrls: ['./model-widget.component.less']
})
export class ModelWidgetComponent implements OnInit {

  public model: JewelryModel;

  public modelInfo: ModelInfo;

  public modelIdentifier: string;

  public modelSku: string;

  public currentImages: string[];

  constructor(
    private _modelService: ModelService,
    private _activatedRoute: ActivatedRoute,
    private _clipboardService: ClipboardService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(queryParams => {
      this.init();
    });
    this._activatedRoute.params.subscribe(routeParams => {
      this.init();
    });
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
      this._modelService.loadModelInfo(this.modelSku).then(mi => this.modelInfo = mi);
      this._modelService.loadImageSrcs(this.modelSku).then(imgs => this.currentImages = imgs);
    });
  }

  public modelChanged() {
    const queryParams: Params = { sku: this.model.sku };
    this.modelSku = this.model.sku;
    this._modelService.loadModelInfo(this.modelSku).then(mi => this.modelInfo = mi);
    this._modelService.loadImageSrcs(this.modelSku).then(imgs => this.currentImages = imgs);

    this._router.navigate(
      [],
      {
        relativeTo: this._activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: "merge",
      });
  }

  public copyLink() {
    var url = window.location.href;
    this._clipboardService.copyToClipboard(url);
  }
}
