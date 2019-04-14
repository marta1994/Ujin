import { Injectable } from '@angular/core';
import { WidgetService, GemstoneOption } from './widget.service';
import { DataLoaderService } from '../api/data-loader.service';

@Injectable()
export class RingInfoService {
  
  private _configInfos: RingConfigurationPrice[] = [];

  constructor(
    private widgetService: WidgetService,
    private dataLoderService: DataLoaderService) { }

  public get price(): number {
    var ringInfo = this.ringInfo;
    return ringInfo == null ? null : ringInfo.price;
  }

  public get ringInfo(): RingInfo {
    var currConfig = this.currentConfig;
    if (currConfig == null) return null;
    var existingPriceConf = this._configInfos.find(p => p.ringConfig.isEqual(currConfig));
    if (existingPriceConf) return existingPriceConf.info;
    existingPriceConf = new RingConfigurationPrice();
    existingPriceConf.ringConfig = currConfig;
    this._configInfos.push(existingPriceConf);
    this.loadRingInfo(existingPriceConf);
  }

  private get currentConfig(): RingConfiguration {
    if (!this.widgetService.configuration || !this.widgetService.configuration.length)
      return null;
    return new RingConfiguration(
      this.widgetService.metalSelectedItem.id,
      this.widgetService.decorationSelectedItem.id,
      this.widgetService.gemstoneSelectedItem.id,
      this.widgetService.selectedSize,
      this.widgetService.gemstoneOptionItem.value
    );
  }

  private loadRingInfo(priceConfig: RingConfigurationPrice) {
    var url = "api/RingInfo/RingInfo/";
    var params = Object.keys(priceConfig.ringConfig).map(k => `${k}=${priceConfig.ringConfig[k]}`);
    url = `${url}?${params.join('&')}`;
    this.dataLoderService.loadData<RingInfo>(url)
      .subscribe(
      res => priceConfig.info = res,
      error => console.log(error));    
  }
}

class RingConfiguration {
  constructor(
    public metalId: number,
    public decorationId: number,
    public gemstoneId: number,
    public size: number,
    public gemstoneOption: GemstoneOption) { }

  public isEqual(config: RingConfiguration): boolean {
    return config != null
      && config.metalId === this.metalId
      && config.decorationId === this.decorationId
      && config.gemstoneOption === this.gemstoneOption
      && ((config.gemstoneId === this.gemstoneId) || this.gemstoneOption == GemstoneOption.Zirconium)
      && config.size === this.size;
  }
}

class RingConfigurationPrice {
  public ringConfig: RingConfiguration;
  public info: RingInfo;
  public get isLoading(): boolean {
    return this.info == null;
  }
}

export interface RingInfo {
  price: number;
  metalWeight: number;
  gemstoneWeight?: number;
  gemstoneLengthMm: number;
  gemstoneWidthMm: number;
}
