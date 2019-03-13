import { Component, OnInit } from '@angular/core';
import { WidgetService, MenuItem, MenuConfig } from '../../services/widget.service';
import { ScreenOrientationService, ScreenOrientation } from '../../services/screen-orientation.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.less']
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
 }
