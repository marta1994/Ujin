import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { JewelryModel, SkuDescription } from '../models';
import { trigger, transition, useAnimation, state, style } from '@angular/animations';
import { fadeIn, fadeOut } from 'ng-animate';
import { ModelService } from 'src/app/services/model.service';
import { DeviceService, DeviceType } from 'src/app/services/device.service';

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.less'],
  animations: [
    trigger('mainImg', [
      transition('* => out',
        useAnimation(fadeOut, { params: { timing: 0.1 } })
      ),
      transition('* => in',
        useAnimation(fadeIn, { params: { timing: 0.2 } })
      ),
      state('loading', style({
        opacity: 0
      }))])
  ]
})
export class ImageCarouselComponent implements OnInit, OnChanges {

  @Input()
  public model: JewelryModel;

  @Input()
  public sku: string;

  public imageIndexes: number[] = [];

  public images: string[] = [];

  public currIndex = 0;

  public imgAnimate: ImageAnimate = ImageAnimate.none;

  constructor(
    private _modelService: ModelService,
    private _deviceService: DeviceService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.model && this.model) {
      this.imageIndexes = [];
      this.model.skuDescriptions.forEach(sk => {
        sk.images.forEach(() => this.imageIndexes.push(this.imageIndexes.length));
      });
    }
    this.sortImages();
  }

  public get device(): DeviceType {
    return this._deviceService.deviceType;
  }
  
  public shift(pos: number) {
    this._tempIndex = (this.currIndex + pos + this.images.length) % this.images.length;
    this.triggerAnimation();
  }

  private triggerAnimation() {
    this.imgAnimate = ImageAnimate.out;
    this._animatedOutImgIndexes = [];
    this._loadedImgIndexes = [];
  }

  private trySetNewImages() {
    if (this._animatedOutImgIndexes.length != 3) return;
    this.currIndex = this._tempIndex;
    this.imgAnimate = ImageAnimate.loading;
    [this.images[(this.currIndex + this.images.length - 1) % this.images.length],
      this.images[this.currIndex],
      this.images[(this.currIndex + 1) % this.images.length]].forEach((img, ind) => {
        let image = new Image();
        image.onload = () => this.onImageLoded(ind);
        image.src = img;
      });
  }

  private _tempIndex: number;
  private _animatedOutImgIndexes: number[] = [];
  private _loadedImgIndexes: number[] = [];

  private onImageLoded(index: number) {
    if (this._loadedImgIndexes.indexOf(index) == -1) this._loadedImgIndexes.push(index);
    if (this._loadedImgIndexes.length != 3) return;
    this.imgAnimate = ImageAnimate.in;
  }

  public imgAnimateDone(event, index: number) {
    switch (event.toState) {
      case ImageAnimate.out:
        if (this._animatedOutImgIndexes.indexOf(index) < 0) this._animatedOutImgIndexes.push(index);
        this.trySetNewImages();
        break;
    }
  }

  private sortImages() {
    if (!this.model || !this.sku) return;
    let sortedSkuData = this.model.skuDescriptions.sort((s1, s2) => this.compareSkuData(s1, s2));
    this.images = [];
    this.currIndex = 0;
    sortedSkuData.forEach(sk => sk.images.forEach(img => this.images.push("assets/images/sku/" + img)));
  }

  private compareSkuData(sku1: SkuDescription, sku2: SkuDescription): number {
    return this._modelService.getDistBetweenSku(sku1.sku, this.sku) -
      this._modelService.getDistBetweenSku(sku2.sku, this.sku);
  }
}

enum ImageAnimate {
  out = "out",
  in = "in",
  loading = "loading",
  none = "none"
}
