import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { JewelryModel, SkuDescription } from '../models';
import { ModelService } from '../model.service';

@Component({
  selector: 'app-vertical-img-collage',
  templateUrl: './vertical-img-collage.component.html',
  styleUrls: ['./vertical-img-collage.component.less']
})
export class VerticalImgCollageComponent implements OnInit, OnChanges {

  @Input()
  public model: JewelryModel;

  @Input()
  public sku: string;

  public images: string[] = [];

  constructor(private _modelService: ModelService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.sortImages();
  }

  private sortImages() {
    if (!this.model || !this.sku) return;
    let sortedSkuData = this.model.skuDescriptions.sort((s1, s2) => this.compareSkuData(s1, s2));
    this.images = [];
    sortedSkuData.forEach(sk => sk.images.forEach(img => this.images.push("assets/images/sku/" + img)));
  }

  private compareSkuData(sku1: SkuDescription, sku2: SkuDescription): number {
    return this._modelService.getDistBetweenSku(sku1.sku, this.sku) -
      this._modelService.getDistBetweenSku(sku2.sku, this.sku);
  }
}
