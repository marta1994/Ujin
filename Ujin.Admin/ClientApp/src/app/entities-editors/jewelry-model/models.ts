export interface IJewelryModel {
    id: number;
    nameKey: string;
    descriptionKey: string;
    identifier: string;
    imagesPattern: string;
    priceExpression: string;
    weightExpression: string;
    tags: string;
    modelState: JewelryModelState;
    configurations: IModelConfiguration[];
}

export class JewelryModel implements IJewelryModel {

    constructor(jewelryModel: IJewelryModel) {
        this.nameKey = jewelryModel.nameKey;
        this.descriptionKey = jewelryModel.descriptionKey;
        this.id = jewelryModel.id;
        this.identifier = jewelryModel.identifier;
        this.imagesPattern = jewelryModel.imagesPattern;
        this.priceExpression = jewelryModel.priceExpression;
        this.weightExpression = jewelryModel.weightExpression;
        this.tags = jewelryModel.tags;
        this.modelState = jewelryModel.modelState;
        this.configurations = jewelryModel.configurations.map(c => new ModelConfiguration(c, this));
    }

    public id: number;
    public nameKey: string;
    public descriptionKey: string;
    public identifier: string;
    public imagesPattern: string;
    public priceExpression: string;
    public weightExpression: string;
    public tags: string;
    public modelState: JewelryModelState;
    public configurations: ModelConfiguration[];

    public get modelStateNameKey(): string {
        return JewelryModelState[this.modelState];
    }
}

export interface IModelConfiguration {
  id: number;
  nameKey: string;
  identifier: string;
  order: number;
  jewelryModelId: number;
  configurationType: JewelryModelConfigType;
  configurationOptions: string;
}

export class ModelConfiguration implements IModelConfiguration {
  constructor(modelConfig: IModelConfiguration, parent: JewelryModel) {
    this.nameKey = modelConfig.nameKey;
    this.id = modelConfig.id;
    this.identifier = modelConfig.identifier;
    this.order = modelConfig.order;
    this.jewelryModelId = modelConfig.jewelryModelId;
    this.configurationType = modelConfig.configurationType;
    this.configurationOptions = modelConfig.configurationOptions;

    this.modelState = parent.modelState;
  }

  public id: number;
  public nameKey: string;
  public order: number;
  public identifier: string;
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
