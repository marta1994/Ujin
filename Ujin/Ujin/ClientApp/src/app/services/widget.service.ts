import { Injectable } from '@angular/core';
import { DataLoaderService } from '../api/data-loader.service'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WidgetService {
  public static SIZE_DEFAULT: number = 17;
  public static SIZE_RANGE = { min: 11.5, max: 24.5 };

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
}

export class MenuItem {
  public nameKey: string;
  public subItems: MenuItem[];
}

export class MenuConfig {
  constructor(
    public nameKey: string,
    public value: any) {}
}
