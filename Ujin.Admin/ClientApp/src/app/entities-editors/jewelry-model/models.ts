export class JewelryModel {

  constructor(jewelryModel: JewelryModel) {
    this.nameKey = jewelryModel.nameKey;
    this.id = jewelryModel.id;
    this.basePrice = jewelryModel.basePrice;
    this.imagesPattern = jewelryModel.imagesPattern;
    this.priceExpression = jewelryModel.priceExpression;
    this.configurations = jewelryModel.configurations.map(c => new ModelConfiguration(c));
  }

  public id: number;
  public nameKey: string;
  public basePrice: number;
  public imagesPattern: string;
  public priceExpression: string;
  public configurations: ModelConfiguration[];
}

export class ModelConfiguration {
  constructor(modelConfig: ModelConfiguration) {
    this.nameKey = modelConfig.nameKey;
    this.id = modelConfig.id;
    this.jewelryModelId = modelConfig.jewelryModelId;
    this.configurationType = modelConfig.configurationType;
    this.configurationOptions = modelConfig.configurationOptions;
  }

  public id: number;
  public nameKey: string;
  public jewelryModelId: number;
  public configurationType: JewelryModelConfigType;
  public configurationOptions: string;
}

enum JewelryModelConfigType {
  Options = 1,
  Number = 2,
}
