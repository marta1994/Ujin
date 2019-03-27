import { Injectable } from '@angular/core';
import { MenuConfig, MenuItem } from './widget.service';

@Injectable()
export class WidgetSelectedStateService {

  private configSelected: () => MenuConfig;
  private detectChanges: () => void;
  private imgSrc: () => string;

  public imgAnimate: ImgAnimateState;

  private _tempSelectedItem: MenuItem;

  public init(
    configSelected: () => MenuConfig,
    detectChanges: () => void,
    imgSrc: () => string) {
    this.configSelected = configSelected;
    this.detectChanges = detectChanges;
    this.imgSrc = imgSrc;
  }

  public selectSubItem(item: MenuItem) {
    if (this.configSelected().value === item) return;
    this.imgAnimate = ImgAnimateState.Out;
    this._tempSelectedItem = item;
  }

  public imgAnimateDone(event) {
    switch (event.toState) {
      case ImgAnimateState.Out:
        if (this._tempSelectedItem) {
          this.configSelected().value = this._tempSelectedItem;
        }
        this._tempSelectedItem = null;
        this.imgAnimate = ImgAnimateState.Loading;
        this.tryStartInAnimation();
        break;
      case ImgAnimateState.In:
        this.imgAnimate = ImgAnimateState.None;
        this.detectChanges();
        break;
    }
  }

  public onImageLoded() {
    this.tryStartInAnimation();
  }

  private tryStartInAnimation() {
    let img = new Image();
    img.src = this.imgSrc();
    if (!img.complete) return;
    this.imgAnimate = ImgAnimateState.In;
  }
}


export enum ImgAnimateState {
  In = "in",
  Out = "out",
  Loading = "loading",
  None = "none"
}
