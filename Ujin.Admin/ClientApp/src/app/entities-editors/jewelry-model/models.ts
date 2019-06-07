export interface IJewelryModel {
  id: number;
  nameKey: string;
  basePrice: number;
  imagesPattern: string;
  priceExpression: string;
  modelState: JewelryModelState;
  configurations: IModelConfiguration[];
}

export class JewelryModel implements IJewelryModel {

  constructor(jewelryModel: IJewelryModel) {
    this.nameKey = jewelryModel.nameKey;
    this.id = jewelryModel.id;
    this.basePrice = jewelryModel.basePrice;
    this.imagesPattern = jewelryModel.imagesPattern;
    this.priceExpression = jewelryModel.priceExpression;
    this.modelState = jewelryModel.modelState;
    this.configurations = jewelryModel.configurations.map(c => new ModelConfiguration(c, this));
  }

  public id: number;
  public nameKey: string;
  public basePrice: number;
  public imagesPattern: string;
  public priceExpression: string;
  public modelState: JewelryModelState;
  public configurations: ModelConfiguration[];

  public get modelStateNameKey(): string {
    return JewelryModelState[this.modelState];
  }
}

export interface IModelConfiguration {
  id: number;
  nameKey: string;
  jewelryModelId: number;
  configurationType: JewelryModelConfigType;
  configurationOptions: string;
}

export class ModelConfiguration implements IModelConfiguration {
  constructor(modelConfig: IModelConfiguration, parent: JewelryModel) {
    this.nameKey = modelConfig.nameKey;
    this.id = modelConfig.id;
    this.jewelryModelId = modelConfig.jewelryModelId;
    this.configurationType = modelConfig.configurationType;
    this.configurationOptions = modelConfig.configurationOptions;

    this.modelState = parent.modelState;
  }

  public id: number;
  public nameKey: string;
  public jewelryModelId: number;
  public configurationType: JewelryModelConfigType;
  public configurationOptions: string;

  public modelState: JewelryModelState;

  public get configurationTypeNameKey(): string {
    return getJewelryModelConfigTypeKey(this.configurationType);
  }
}

export enum JewelryModelState {
  BuildingState = -1,
  Disabled = 0,
  Enabled = 1
}

export enum JewelryModelConfigType {
  Options = 1,
  Number = 2,
}

export function getJewelryModelConfigTypeKey(value: JewelryModelConfigType) {
  return "modelConfig.configName." + JewelryModelConfigType[value];
}
