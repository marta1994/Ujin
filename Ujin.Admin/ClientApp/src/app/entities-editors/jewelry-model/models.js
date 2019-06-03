"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JewelryModel = /** @class */ (function () {
    function JewelryModel(jewelryModel) {
        this.nameKey = jewelryModel.nameKey;
        this.id = jewelryModel.id;
        this.basePrice = jewelryModel.basePrice;
        this.imagesPattern = jewelryModel.imagesPattern;
        this.priceExpression = jewelryModel.priceExpression;
        this.configurations = jewelryModel.configurations.map(function (c) { return new ModelConfiguration(c); });
    }
    return JewelryModel;
}());
exports.JewelryModel = JewelryModel;
var ModelConfiguration = /** @class */ (function () {
    function ModelConfiguration(modelConfig) {
        this.nameKey = modelConfig.nameKey;
        this.id = modelConfig.id;
        this.jewelryModelId = modelConfig.jewelryModelId;
        this.configurationType = modelConfig.configurationType;
        this.configurationOptions = modelConfig.configurationOptions;
    }
    return ModelConfiguration;
}());
exports.ModelConfiguration = ModelConfiguration;
var JewelryModelConfigType;
(function (JewelryModelConfigType) {
    JewelryModelConfigType[JewelryModelConfigType["Options"] = 1] = "Options";
    JewelryModelConfigType[JewelryModelConfigType["Number"] = 2] = "Number";
})(JewelryModelConfigType || (JewelryModelConfigType = {}));
//# sourceMappingURL=models.js.map