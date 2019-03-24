import { Component, OnInit } from '@angular/core';
import { WidgetService, MenuItem, MenuConfig } from '../../services/widget.service';
import { trigger, useAnimation, transition, state, style, animate, query } from '@angular/animations';
import { fadeIn, fadeOut } from 'ng-animate';

enum ImgAnimateState {
  In = "in",
  Out = "out",
  Loading = "loading",
  None = "none"
}

@Component({
  selector: 'app-desktop-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.less'],
  animations: [
    trigger('widgetImg', [
      transition('* => out',
        useAnimation(fadeOut, { params: { timing: 0.3 } })),
      transition('* => in',
        useAnimation(fadeIn, { params: { timing: 0.3 } })),
      state('loading', style({
        opacity: 0
      })),
      transition('* => loading', [animate(0.3)])])
  ]
})
export class WidgetComponent implements OnInit {

  public menuItems: MenuItem[];
  public configuration: MenuConfig[];
  private _selectedItem: MenuItem;

  public imgAnimate: ImgAnimateState = ImgAnimateState.None;

  constructor(
    private _widgetService: WidgetService) { }

  ngOnInit() {
    this._widgetService.loadMenuItems()
      .subscribe(
        data => {
          this.menuItems = data;
          this.selectItem(this.menuItems[0]);
          this.configuration = this._widgetService.configuration;
        },
        error => console.log(error));
  }

  public get imageSrc(): string {
    return this._widgetService.desktopImage;
  }

  public get sliderConfig() {
    return WidgetService.SIZE_CONFIG;
  }

  public get selectedItem(): MenuItem {
    return this._selectedItem;
  }

  public get sliderValue(): number {
    return this.configuration.find(c => c.nameKey === WidgetService.SIZE_CONFIG.nameKey)
      .value;
  }

  public set sliderValue(val: number) {
    this.configuration.find(c => c.nameKey === WidgetService.SIZE_CONFIG.nameKey)
      .value = val;
  }

  public selectItem(item: MenuItem) {
    this._selectedItem = item;
  }

  private get configSelected(): MenuConfig {
    return this.configuration.find(it => it.nameKey === this._selectedItem.nameKey);
  }

  private _tempSelectedItem: MenuItem;

  public selectSubItem(item: MenuItem) {
    if (this.configSelected.value === item) return;
    this.imgAnimate = ImgAnimateState.Out;
    this._tempSelectedItem = item;
  }

  public imgAnimateDone(event) {
    switch (event.toState) {
      case ImgAnimateState.Out:
        this.configSelected.value = this._tempSelectedItem;
        this._tempSelectedItem = null;
        this.imgAnimate = ImgAnimateState.Loading;
        this.tryStartInAnimation();
        break;
      case ImgAnimateState.In:
        this.imgAnimate = ImgAnimateState.None;
        break;
    }
  }

  public onImageLoded() {
    this.tryStartInAnimation();
  }

  private tryStartInAnimation() {
    let img = new Image();
    img.src = this.imageSrc;
    if (!img.complete) return;
    this.imgAnimate = ImgAnimateState.In;
  }

  public isSelected(item: MenuItem): boolean {
    if (item === this._selectedItem)
      return true;
    for (let conf of this.configuration) {
      if (conf.value === item)
        return true;
    }
    return false;
  }

  public getSelectedSubMenu(): MenuItem[] {
    return this._selectedItem ? this._selectedItem.subItems : null;
  }

}
