import { Component } from '@angular/core';
import { JewelryModelService } from '../entities-editors/jewelry-model/jewelry-model.service';
import { MetalEditorService, Metal } from '../entities-editors/metal-editor/metal-editor.service';
import { GemstoneService, Gemstone } from '../entities-editors/gemstone/gemstone.service';
import { JewelryModel, ModelConfiguration, JewelryModelConfigType } from '../entities-editors/jewelry-model/models';
import { SelectorOptions, OptionsSource } from '../entities-editors/jewelry-model/model-config-editors/options-editor/options-editor.component';
import { ApiService } from '../api/api.service';
import { Terms, AppSettingsService } from '../services/app-settings.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.less']
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
      _appSettings.loadTerms()])
      .then(res => {
        this._metals = res[1];
        this._gemstones = res[2];
        this._terms = res[3];
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
          .map(m => { return { name: m.identifier, value: m.identifier } });
        break;
      case OptionsSource.Custom:
        src = opts.customOptions.map(m => { return { name: m.nameKey, value: m.identifier } });
        break;
    }
    (<any>config).source = src;
  }

  public calcPrice() {
    if (!this.selectedJewelryModel) return;
    let sku = this.selectedJewelryModel.identifier;
    this.selectedJewelryModel.configurations.forEach(c =>
      sku += this._terms.skuSeparator + (<any>c).value);
    this._api.loadData<number>(`/api/price/price/?sku=${sku}`)
      .then(res => this.price = res);
  }
}
