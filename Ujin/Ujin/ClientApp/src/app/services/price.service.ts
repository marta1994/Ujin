import { Injectable } from '@angular/core';
import { WidgetService } from './widget.service';
import { DataLoaderService } from '../api/data-loader.service';

@Injectable()
export class PriceService {
  
  private _configPrices: RingConfigurationPrice[] = [];

  constructor(
    private widgetService: WidgetService,
    private dataLoderService: DataLoaderService) { }

  public get price(): number {
    var currConfig = this.currentConfig;
    if (currConfig == null) return null;
    var existingPriceConf = this._configPrices.find(p => p.ringConfig.isEqual(currConfig));
    if (existingPriceConf) return existingPriceConf.price;
    existingPriceConf = new RingConfigurationPrice();
    existingPriceConf.ringConfig = currConfig;
    this._configPrices.push(existingPriceConf);
    this.calculatePrice(existingPriceConf);
  }

  private get currentConfig(): RingConfiguration {
    if (!this.widgetService.configuration || !this.widgetService.configuration.length)
      return null;
    return new RingConfiguration(
      this.widgetService.metalSelectedItem.id,
      this.widgetService.decorationSelectedItem.id,
      this.widgetService.gemstoneSelectedItem.id,
      this.widgetService.selectedSize
    );
  }

  private calculatePrice(priceConfig: RingConfigurationPrice) {
    var url = "api/Price/RingPrice/";
    var params = Object.keys(priceConfig.ringConfig).map(k => `${k}=${priceConfig.ringConfig[k]}`);
    url = `${url}?${params.join('&')}`;
    this.dataLoderService.loadData<number>(url)
      .subscribe(
      res => priceConfig.price = res,
      error => console.log(error));    
  }
}

class RingConfiguration {
  constructor(
    public metalId: number,
    public decorationId: number,
    public gemstoneId: number,
    public size: number) { }

  public isEqual(config: RingConfiguration): boolean {
    return config != null
      && config.metalId === this.metalId
      && config.decorationId === this.decorationId
      && config.gemstoneId === this.gemstoneId
      && config.size === this.size;
  }
}

class RingConfigurationPrice {
  public ringConfig: RingConfiguration;
  public price: number;
  public get isLoading(): boolean {
    return this.price == null;
  }
}
