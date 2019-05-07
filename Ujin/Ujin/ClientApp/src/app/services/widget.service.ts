import { Injectable } from '@angular/core';
import { DataLoaderService } from '../api/data-loader.service'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WidgetService {
  public static SIZE_DEFAULT: number = 17;
  public static SIZE_CONFIG = {
    min: 15,
    max: 22,
    step: 0.5,
    nameKey: "widget.size.capture"
  };
  public static METAL_KEY: string = "widget.metal.capture";
  public static GEMSTONE_KEY: string = "widget.gemstone.capture";
  public static DECORATION_KEY: string = "widget.covering.capture";
  public static GEMSTONE_OPTION_KEY: string = "widget.gemstone.gemstoneOption";

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
      var val = this.getMenuItemVal(it);
      this._configuration.push(new MenuConfig(it.nameKey, val));
    });
    this._configuration.push(new MenuConfig(WidgetService.GEMSTONE_OPTION_KEY, GemstoneOption.Zirconium));
  }

  private getMenuItemVal(it: MenuItem): MenuItem | number {
    switch (it.nameKey) {
      case WidgetService.METAL_KEY:
        return it.subItems.find(i => i.id === 3);//silver
      case WidgetService.GEMSTONE_KEY:
        return it.subItems.find(i => i.id === 2);//ruby
      case WidgetService.DECORATION_KEY:
        return it.subItems.find(i => i.id === 3);//doodles
      case WidgetService.SIZE_CONFIG.nameKey:
        return WidgetService.SIZE_DEFAULT;
    }
  }

  public get metalSelectedItem(): MenuItem {
    return this._configuration.find(it => it.nameKey === WidgetService.METAL_KEY).value;
  }

  public get gemstoneSelectedItem(): MenuItem {
    return this._configuration.find(it => it.nameKey === WidgetService.GEMSTONE_KEY).value;
  }

  public get decorationSelectedItem(): MenuItem {
    return this._configuration.find(it => it.nameKey === WidgetService.DECORATION_KEY).value;
  }

  public get gemstoneOptionItem(): MenuConfig {
    return this._configuration.find(it => it.nameKey === WidgetService.GEMSTONE_OPTION_KEY);
  }

  public get selectedSize(): number {
    return this._configuration.find(it => it.nameKey === WidgetService.SIZE_CONFIG.nameKey).value;
  }

  public get desktopImage(): string {
    return this.getImagePath('desktop');
  }

  public get mobileImage(): string {
    return this.getImagePath('mobile');
  }

  private getImagePath(folder: string): string {
    if (!this._configuration || !this.configuration.length) return null;
    var idArr = [ this.metalSelectedItem, this.gemstoneSelectedItem, this.decorationSelectedItem];
    var name: string = "";
    for (let i = 0; i < idArr.length; ++i) {
      var val: string = idArr[i].nameKey;
      name += val.split('.')[2];
      name += i === idArr.length - 1 ? "" : "_";
    }

    return `../../../assets/images/widget-rings/${folder}/${name}.png`;
  }
}

export class MenuItem {
  public id: number;
  public nameKey: string;
  public subItems: MenuItem[];
}

export class MenuConfig {
  constructor(
    public nameKey: string,
    public value: any) { }
}

export enum GemstoneOption {
  Genuine = 0,
  Artifical = 1,
  Zirconium = 2
}
