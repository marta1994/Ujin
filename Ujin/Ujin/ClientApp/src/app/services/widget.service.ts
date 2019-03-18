import { Injectable } from '@angular/core';
import { DataLoaderService } from '../api/data-loader.service'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WidgetService {
  public static SIZE_DEFAULT: number = 17;
  public static SIZE_CONFIG = {
    min: 11.5,
    max: 24.5,
    step: 0.5,
    nameKey: "widget.size.capture"
  };
  public static METAL_KEY: string = "widget.metal.capture";
  public static GEMSTONE_KEY: string = "widget.gemstone.capture";
  public static DECORATION_KEY: string = "widget.covering.capture";

  private _configuration: MenuConfig[] = [];

  constructor(private dataLoader: DataLoaderService) { }

  public loadMenuItems(): Observable<MenuItem[]> {
    return new Observable<MenuItem[]>((observer) => {
      const handler = (e: MenuItem[]) => observer.next(e);

      var dataLoad = this.dataLoader.loadData<MenuItem[]>('api/widget/GetMenuItems')
        .subscribe(data => {
          this.initConfiguration(data);
          handler(data);
        });

      return () => dataLoad.unsubscribe();
    });
  }

  public get configuration(): MenuConfig[] {
    return this._configuration;
  }

  private initConfiguration(menuItems: MenuItem[]) {
    menuItems.forEach(it => {
      var val = it.subItems && it.subItems.length ? it.subItems[0] : WidgetService.SIZE_DEFAULT;
      this._configuration.push(new MenuConfig(it.nameKey, val));
    });
  }

  public get desktopImage(): string {
    return this.getImagePath('desktop', '-min');
  }

  public get mobileImage(): string {
    return this.getImagePath('mobile');
  }

  private getImagePath(folder: string, suffix: string = ''): string {
    if (!this._configuration || !this.configuration.length) return null;
    var idArr = [
      this._configuration.find(it => it.nameKey === WidgetService.METAL_KEY),
      this._configuration.find(it => it.nameKey === WidgetService.GEMSTONE_KEY),
      this._configuration.find(it => it.nameKey === WidgetService.DECORATION_KEY)];
    var name: string = "";
    for (let i = 0; i < idArr.length; ++i) {
      var val: string = idArr[i].value.nameKey;
      name += val.split('.')[2];
      name += i === idArr.length - 1 ? "" : "_";
    }
    return `../../../assets/images/widget-rings/${folder}/${name}${suffix}.png`;
  }
}

export class MenuItem {
  public nameKey: string;
  public subItems: MenuItem[];
}

export class MenuConfig {
  constructor(
    public nameKey: string,
    public value: any) { }
}
