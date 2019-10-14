export class JewelryModel {
    constructor(model: any, skuSeparator: string) {
        this.identifier = model.identifier;
        this.nameKey = model.nameKey;
        this.imagesCount = model.imagesCount;
        this.configurations = model.configurations.map(cfg => Configuration.Create(cfg));
        this.skuDescriptions = model.skuDescriptions.map(sd => new SkuDescription(sd));

        this.skuSeparator = skuSeparator;
    }

    public identifier: string;
    public nameKey: string;
    public imagesCount: number;
    public configurations: Configuration[];
    public skuDescriptions: SkuDescription[];

    private skuSeparator: string;

    public get sku(): string {
        return this.identifier + this.skuSeparator +
            this.configurations.sort(c => c.order).map(c => c.value).join(this.skuSeparator);
    }
}

export class SkuDescription {

    constructor(sd: SkuDescription) {
        this.sku = sd.sku;
        this.images = JSON.parse(<any>sd.images);
    }

    public sku: string;
    public images: string[];
}

export abstract class Configuration {

    constructor(config: any) {
        this.identifier = config.identifier;
        this.order = config.order;
        this.nameKey = config.nameKey;
        this.configurationType = config.configurationType;
    }

    public identifier: string;
    public order: number;
    public nameKey: string;
    public configurationType: JewelryModelConfigType;

    public value: any;

    public abstract setValue(configValue: string);

    public static Create(config: any): Configuration {
        switch (config.configurationType) {
            case JewelryModelConfigType.Number:
                return new NumberConfiguration(config);
            case JewelryModelConfigType.Options:
                return new SelectorConfiguration(config);
        }
    }
}

export class NumberConfiguration extends Configuration {

  constructor(config: any) {
    super(config);
    this.min = config.configOptions.min;
    this.max = config.configOptions.max;
    this.step = config.configOptions.step;
    this.setValue(config.value);
  }

  public setValue(configValue: string) {
    if (configValue) {
      this.value = configValue;
      return;
    }
    var stepsCount = Math.floor((this.max - this.min) / this.step / 2);

    this.value = this.min + this.step * stepsCount;
  }

  public min: number;
  public max: number;
  public step: number;
}

export class SelectorConfiguration extends Configuration {

  constructor(config: any) {
    super(config);
    this.optionsSource = config.configOptions.optionsSource;
    this.customOptions = (config.configOptions.customOptions || []).map(opt => new CustomOption(opt));
    this.gemstoneSource = (config.configOptions.gemstoneSource || []).map(opt => new Gemstone(opt));
    this.metalSource = (config.configOptions.metalSource || []).map(opt => new NamedEntity(opt));
    this.setValue(config.value);
  }

  public setValue(configValue: string) {
    if (configValue) {
      this.value = configValue;
      return;
    }
    switch (this.optionsSource) {
      case OptionsSource.Custom:
        this.value = this.customOptions[0].identifier;
        break;
      case OptionsSource.Gemstone:
        this.value = this.gemstoneSource[0].identifier;
        break;
      case OptionsSource.Metal:
        this.value = this.metalSource.find(m => m.identifier == 'silver925') ? 'silver925' : this.metalSource[0].identifier;
        break;
    }
  }

  public optionsSource: OptionsSource;
  public customOptions: CustomOption[];
  public gemstoneSource: Gemstone[];
  public metalSource: NamedEntity[];
}

export class CustomOption {

    constructor(opt: any) {
        this.nameKey = opt.nameKey;
        this.identifier = opt.identifier;
    }

    public nameKey: string;
    public identifier: string;
}

export enum JewelryModelConfigType {
    Options = 1,
    Number = 2,
}

export enum OptionsSource {
    Custom = 1,
    Metal = 2,
    Gemstone = 3
}

export class Gemstone {

    constructor(gemstone: Gemstone) {
        this.identifier = gemstone.identifier;
        this.widthMm = gemstone.widthMm;
        this.heightMm = gemstone.heightMm;
        this.weight = gemstone.weight;
        this.color = new Color(gemstone.color);
        this.gemstoneClass = new NamedEntity(gemstone.gemstoneClass);
        this.gemstoneSource = new NamedEntity(gemstone.gemstoneSource);
        this.gemstoneCut = new NamedEntity(gemstone.gemstoneCut);
    }
    
    public identifier: string;
    public widthMm: number;
    public heightMm: number;
    public weight: number;
    
    public color: Color;
    public gemstoneClass: NamedEntity;
    public gemstoneSource: NamedEntity;
    public gemstoneCut: NamedEntity;
}

export class NamedEntity {

    constructor(namedEntity: NamedEntity) {
        this.nameKey = namedEntity.nameKey;
        this.identifier = namedEntity.identifier;
    }

    public identifier: string;
    public nameKey: string;
}

export class Color {

    constructor(color: Color) {
        this.nameKey = color.nameKey;
        this.colorHexCode = color.colorHexCode;
    }
    
    public nameKey: string;
    public colorHexCode: string;
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
