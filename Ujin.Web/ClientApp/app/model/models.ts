export class JewelryModel {
    constructor(model: any) {
        this.identifier = model.identifier;
        this.nameKey = model.nameKey;
        this.imagesCount = model.imagesCount;
        this.configurations = model.configurations.map(cfg => Configuration.Create(cfg));
    }

    public identifier: string;
    public nameKey: string;
    public imagesCount: number;
    public configurations: Configuration[];

    public get sku(): string {
        return this.identifier + "_" + this.configurations.sort(c => c.order).map(c => c.value).join("_");
    }
}

export abstract class Configuration {

    constructor(config: any) {
        this.identifier = config.identifier;
        this.order = config.order;
        this.nameKey = config.nameKey;
        this.configurationType = config.configurationType;
        this.setValue(config.value);
    }

    public identifier: string;
    public order: number;
    public nameKey: string;
    public configurationType: JewelryModelConfigType;

    public value: string;

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
    }

    public setValue(configValue: string) {
        this.value = !configValue ? this.min.toString() : configValue;
    }

    public min: number;
    public max: number;
    public step: number;
}

export class SelectorConfiguration extends Configuration {

    constructor(config: any) {
        super(config);
        this.optionsSource = config.configOptions.optionsSource;
        this.externalSourceIds = config.configOptions.externalSourceIds || [];
        this.customOptions = (config.configOptions.customOptions || []).map(opt => new CustomOption(opt));
    }

    public setValue(configValue: string) {
        //TODO: correctly set default VAlue!!!!
        this.value = !configValue ? null : configValue;
    }

    public optionsSource: OptionsSource;
    public externalSourceIds: number[];
    public customOptions: CustomOption[];
}

export class CustomOption {

    constructor(opt: any) {
        this.nameKey = opt.nameKey;
        this.identifier = opt.identifier;
        this.value = opt.value;
    }

    public nameKey: string;
    public identifier: string;
    public value: number;
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