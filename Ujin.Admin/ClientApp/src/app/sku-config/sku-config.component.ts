import { Component, Input } from '@angular/core';
import { ModelConfiguration, JewelryModelConfigType, JewelryModel } from '../entities-editors/jewelry-model/models';
import { SelectorOptions, OptionsSource } from '../entities-editors/jewelry-model/model-config-editors/options-editor/options-editor.component';
import { GemNamedEntity, GemstoneService, Gemstone } from '../entities-editors/gemstone/gemstone.service';
import { AppSettingsService, Terms } from '../services/app-settings.service';
import { MetalEditorService, Metal } from '../entities-editors/metal-editor/metal-editor.service';
import { ApiService } from '../api/api.service';
import { JewelryModelService } from '../entities-editors/jewelry-model/jewelry-model.service';

@Component({
  selector: 'app-sku-config',
  templateUrl: './sku-config.component.html',
  styleUrls: ['./sku-config.component.less']
})
export class SkuConfigComponent {

  public jewelryModels: JewelryModel[];

  public selectedJewelryModel: JewelryModel;

  private _metals: Metal[];

  private _gemstones: Gemstone[];

  private _terms: Terms;

  public JewelryModelConfigType = JewelryModelConfigType;

  public modelInfo: ModelInfo;

  public skuDescription: SkuDescription;

  public skuImages: string[];

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

  public deleteImage(index: number) {
    this.skuImages.splice(index, 1);
  }

  public addImage() {
    this.skuImages.push("");
  }

  public saveSkuDescription() {
    this.skuDescription.images = JSON.stringify(this.skuImages);
    this._api.postData(`/api/SkuData/SaveSkuDescriptions/`, [this.skuDescription])
      .then(res => location.reload())
      .catch(err => alert(err));
  }

  private processConfig(config: ModelConfiguration) {
    if (config.configurationType == JewelryModelConfigType.Number) {
      (<any>config).value = 17;
    }
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

  public getModelInfo() {
    if (!this.selectedJewelryModel) {
      alert("Виберіть модель!");
      return;
    }
    if (this.selectedJewelryModel.configurations.find(c => (<any>c).value == null) != null) {
      alert("Заповніть всі конфігурації!");
      return;
    }
    this.modelInfo = null;
    let sku = this.selectedJewelryModel.identifier;
    this.selectedJewelryModel.configurations.forEach(c =>
      sku += this._terms.skuSeparator + (<any>c).value);
    this._api.loadData<ModelInfo>(`/api/SkuData/data/?sku=${sku}`)
      .then(res => this.modelInfo = new ModelInfo(res));
    this._api.loadData<SkuDescription>(`/api/SkuData/SkuDescription/?sku=${sku}`)
      .then(res => {
        this.skuDescription = new SkuDescription(res, sku, this.selectedJewelryModel.id);
        this.skuImages = JSON.parse(this.skuDescription.images);
      });
  }
}

export class ModelInfo {

  constructor(modelInfo: ModelInfo) {
    this.price = modelInfo.price;
    this.weight = modelInfo.weight;
    this.nodes = modelInfo.nodes.map(ch => new ModelInfoNode(ch));
  }

  price: number;
  weight: number;
  nodes: ModelInfoNode[];
}

export class ModelInfoNode {

  constructor(node: ModelInfoNode) {
    this.nameKey = node.nameKey;
    this.value = node.value;
    this.needTranslateValue = node.needTranslateValue;
    this.suffixKey = node.suffixKey;
    this.children = (node.children || []).map(ch => new ModelInfoNode(ch));
  }

  nameKey: string;
  value: string;
  needTranslateValue: boolean;
  suffixKey: string;
  children: ModelInfoNode[];
}

class SkuDescription {

  constructor(sk: SkuDescription, sku: string, jModelId: number) {
    this.id = sk ? sk.id : -1;
    this.sku = sku;
    this.images = sk ? sk.images : "[]";
    this.jewelryModelId = jModelId;
  }

  public id: number;
  public sku: string;
  public images: string;
  public jewelryModelId: number;
}

@Component({
  selector: 'app-info-node',
  template: `<div class="node-wrapper property-value">
        <label class="property">{{node.nameKey|translate}}:</label>
        <label *ngIf="!node.children || node.children.length == 0" class="value">
            {{node.needTranslateValue ? (node.value|translate) : node.value}}{{' '}}{{node.suffixKey|translate}}
        </label>
        <div class="children-wrapper" *ngIf="node.children && node.children.length > 0">
            <app-info-node *ngFor="let child of node.children" [node]="child"></app-info-node>
        </div>
    </div>`
})
export class InfoNodeComponent {

  @Input()
  public node: ModelInfoNode;
}
