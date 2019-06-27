export class JewelryModel {
    constructor(model: any) {
        this.identifier = model.identifier;
        this.nameKey = model.nameKey;
        this.configurations = model.configurations.map(cfg => Configuration.Create(cfg));
    }

    public identifier: string;
    public nameKey: string;
    public configurations: Configuration[];
}

export abstract class Configuration {

    constructor(config: any) {
        this.identifier = config.identifier;
        this.order = config.order;
        this.nameKey = config.nameKey;
        this.configurationType = config.configurationType;
        this.selectedValue = config.selectedValue;
    }

    public identifier: string;
    public order: number;
    public nameKey: string;
    public configurationType: JewelryModelConfigType;

    public selectedValue: string;

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