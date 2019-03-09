import { Component, OnInit } from '@angular/core';
import { WidgetService, MenuItem, MenuConfig } from '../../services/widget.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.less']
})
export class WidgetComponent implements OnInit {

  public menuItems: MenuItem[];
  public configuration: MenuConfig[];
  private selectedItem: MenuItem;

  constructor(private widgetService: WidgetService) { }

  ngOnInit() {
    this.widgetService.loadMenuItems()
      .subscribe(
        data => {
          this.menuItems = data;
          this.selectItem(this.menuItems[0]);
          this.configuration = this.widgetService.configuration;
        },
        error => console.log(error));
  }

  public selectItem(item: MenuItem) {
    this.selectedItem = item;
  }

  public selectSubItem(item: MenuItem) {
    var configSelected = this.configuration.filter(it => it.nameKey === this.selectedItem.nameKey)[0];
    configSelected.value = item;
  }

  public isSelected(item: MenuItem): boolean {
    if (item === this.selectedItem)
      return true;
    for (let conf of this.configuration) {
      if (conf.value === item)
        return true;
    }
    return false;
  }

  public getSelectedSubMenu(): MenuItem[] {
    return this.selectedItem ? this.selectedItem.subItems : []; 
  }
 }
