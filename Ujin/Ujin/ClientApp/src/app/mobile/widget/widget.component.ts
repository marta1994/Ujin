import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WidgetService, MenuItem, MenuConfig } from '../../services/widget.service';
import { ScreenOrientationService, ScreenOrientation } from '../../services/screen-orientation.service';
import { trigger, useAnimation, transition, state, style, animate, query } from '@angular/animations';
import { fadeIn, fadeOut } from 'ng-animate';

enum ImgAnimateState {
  In = "in",
  Out = "out",
  Loading = "loading",
  None = "none"
}

@Component({
  selector: 'app-mobile-widget',
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
      transition('* => loading', [animate(0.3)])]),
    trigger('bottomMenu', [
      transition('* => *',
        animate('0.3s ease', style({
          boxShadow: '0 2px 2px 0 #f5f5f5'
          })),
      )])
  ]
})
export class WidgetComponent implements OnInit {

  public menuItems: MenuItem[];
  public configuration: MenuConfig[];
  private _selectedItem: MenuItem;

  public imgAnimate: ImgAnimateState = ImgAnimateState.None;

  constructor(
    private _widgetService: WidgetService,
    private _screenOrientationService: ScreenOrientationService,
    private changeDetector: ChangeDetectorRef) { }

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
    return this._widgetService.mobileImage;
  }

  public get sliderDirection(): string {
    return this._screenOrientationService.orientation === ScreenOrientation.Landscape ? "vertical" : "horizontal";
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

  private get configSelected(): MenuConfig {
    return this.configuration.find(it => it.nameKey === this._selectedItem.nameKey);
  }

  private get selectedSubIndex(): number {
    return this._selectedItem.subItems.findIndex(si => this.isSelected(si));
  }

  public selectItem(item: MenuItem) {
    this._selectedItem = item;
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
        this.changeDetector.detectChanges();
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

  public moveToNextConfig() {
    if (!this._selectedItem) return;
    if (this.selectedSubIndex < this._selectedItem.subItems.length - 1) {
      this.selectSubItem(this._selectedItem.subItems[this.selectedSubIndex + 1]);
    }
  }

  public moveToPrevConfig() {
    if (!this._selectedItem) return;
    if (this.selectedSubIndex > 0) {
      this.selectSubItem(this._selectedItem.subItems[this.selectedSubIndex - 1]);
    }
  }
}

