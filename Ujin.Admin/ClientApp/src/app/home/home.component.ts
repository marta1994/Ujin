import { Component } from '@angular/core';
import { JewelryModelService } from '../entities-editors/jewelry-model/jewelry-model.service';
import { MetalEditorService, Metal } from '../entities-editors/metal-editor/metal-editor.service';
import { GemstoneService, Gemstone, GemNamedEntity } from '../entities-editors/gemstone/gemstone.service';
import { JewelryModel, ModelConfiguration, JewelryModelConfigType } from '../entities-editors/jewelry-model/models';
import { SelectorOptions, OptionsSource } from '../entities-editors/jewelry-model/model-config-editors/options-editor/options-editor.component';
import { ApiService } from '../api/api.service';
import { Terms, AppSettingsService } from '../services/app-settings.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.less'],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  public jewelryModels: JewelryModel[];

  public selectedJewelryModel: JewelryModel;

  private _metals: Metal[];

  private _gemstones: Gemstone[];

  private _terms: Terms;

  public JewelryModelConfigType = JewelryModelConfigType;

  public price: number;

  public orderData: OrderData = new OrderData();

  constructor(
    private _api: ApiService,
    _jewelryModelService: JewelryModelService,
    _metalService: MetalEditorService,
    _gemstoneService: GemstoneService,
    _appSettings: AppSettingsService) {

    Promise.all([
      _jewelryModelService.loadJewelryModels(),
      _metalService.loadMetals(),
      _gemstoneService.loadGemstones(),
      _appSettings.loadTerms(),
      _gemstoneService.loadGemNamedEntities(GemNamedEntity.GemClass)])
      .then(res => {
        this._metals = res[1];
        this._gemstones = res[2];
        this._terms = res[3];
        this._gemstones.forEach(g => g.gemstoneClass = res[4].find(gc => gc.id === g.gemstoneClassId));
        let promises = res[0].map(r => _jewelryModelService.loadJewelryModel(r.id));
        Promise.all(promises).then(models => {
          this.jewelryModels = models;
          this.jewelryModels.forEach(model => {
            model.configurations = model.configurations.sort(c => c.id);
            model.configurations.forEach(config => this.processConfig(config));
          });
        });
      });
  }

  private processConfig(config: ModelConfiguration) {
    if (config.configurationType != JewelryModelConfigType.Options)
      return;
    let opts = new SelectorOptions(config.configurationOptions);
    var src: { name: string, value: any }[];
    switch (opts.optionsSource) {
      case OptionsSource.Metal:
        src = this._metals.filter(m => opts.externalSourceIds.indexOf(m.id) >= 0)
          .map(m => { return { name: m.nameKey, value: m.identifier } });
        break;
      case OptionsSource.Gemstone:
        src = this._gemstones.filter(m => opts.externalSourceIds.indexOf(m.id) >= 0)
          .map(m => { return { name: m.gemstoneClass.nameKey, value: m.identifier } });
        break;
      case OptionsSource.Custom:
        src = opts.customOptions.map(m => { return { name: m.nameKey, value: m.identifier } });
        break;
    }
    (<any>config).source = src;
  }

  public calcPrice() {
    if (!this.selectedJewelryModel) {
      alert("Виберіть модель!");
      return;
    }
    if (this.selectedJewelryModel.configurations.find(c => (<any>c).value == null) != null) {
      alert("Заповніть всі конфігурації!");
      return;
    }
    this.price = null;
    let sku = this.selectedJewelryModel.identifier;
    this.selectedJewelryModel.configurations.forEach(c =>
      sku += this._terms.skuSeparator + (<any>c).value);
    this._api.loadData<number>(`/api/price/price/?sku=${sku}`)
      .then(res => this.price = res);
  }

  public createOrder() {
    if (!this.selectedJewelryModel) {
      alert("Виберіть модель!");
      return;
    }
    if (this.selectedJewelryModel.configurations.find(c => (<any>c).value == null) != null) {
      alert("Заповніть всі конфігурації!");
      return;
    }
    if (!this.orderData.price || this.orderData.advance == null
      || !this.orderData.user.email || !this.orderData.user.phone || !this.orderData.user.name
      || !this.orderData.user.surname) {
      alert("Заповніть всі дані про покупця, а також вартість і розмір авансу!");
      return;
    }

    let sku = this.selectedJewelryModel.identifier;
    this.selectedJewelryModel.configurations.forEach(c =>
      sku += this._terms.skuSeparator + (<any>c).value);

    this.orderData.sku = sku;
    this._api.postData(`/api/Order/CreateOrder`, this.orderData)
      .then(res => alert("Замовлення успішно створено"))
      .catch(err => alert("Помилка при створенні замовлення"));
  }
}

class OrderData {

  constructor() {
    this.user = new User();
  }

  user: User;
  sku: string;
  price: number;
  advance: number;
}

class User {
  name: string;
  surname: string;
  email: string;
  phone: string;
}
