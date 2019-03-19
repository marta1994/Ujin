import { Component, OnInit } from '@angular/core';
import { WidgetService, MenuItem, MenuConfig } from '../../services/widget.service';
import { ScreenOrientationService, ScreenOrientation } from '../../services/screen-orientation.service';
import { trigger, useAnimation, transition } from '@angular/animations';
import { slideInLeft, slideInRight } from 'ng-animate';

@Component({
  selector: 'app-mobile-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.less'],
  animations: [
    trigger('widgetImg', [
      transition(':decrement', useAnimation(slideInLeft, { params: { timing: 0.3 } })),
      transition(':increment', useAnimation(slideInRight, { params: { timing: 0.3 } })),
      transition('* => select', useAnimation(slideInRight, { params: { timing: 0.3 } }))])
  ]
})
export class WidgetComponent implements OnInit {

  public menuItems: MenuItem[];
  public configuration: MenuConfig[];
  private _selectedItem: MenuItem;  

  constructor(
    private _widgetService: WidgetService,
    private _screenOrientationService: ScreenOrientationService) { }

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

  public get selectedSubItemIndex(): number {
    if (!this.selectedItem || !this.selectedItem.subItems) return null;
    let configSelected = this.configuration.filter(it => it.nameKey === this._selectedItem.nameKey)[0];
    return this.selectedItem.subItems.indexOf(configSelected.value);
  }

  public selectItem(item: MenuItem) {
    this._selectedItem = item;
  }

  public selectSubItem(item: MenuItem) {
    var configSelected = this.configuration.filter(it => it.nameKey === this._selectedItem.nameKey)[0];
    configSelected.value = item;
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
    var selectedInd = this._selectedItem.subItems.findIndex(si => this.isSelected(si));
    if (selectedInd < this._selectedItem.subItems.length - 1) {
      this.selectSubItem(this._selectedItem.subItems[selectedInd + 1]);
    }
  }

  public moveToPrevConfig() {
    if (!this._selectedItem) return;
    var selectedInd = this._selectedItem.subItems.findIndex(si => this.isSelected(si));
    if (selectedInd > 0) {
      this.selectSubItem(this._selectedItem.subItems[selectedInd - 1]);
    }
  }
 }
