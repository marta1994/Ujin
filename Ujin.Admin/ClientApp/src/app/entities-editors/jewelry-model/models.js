"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JewelryModel = /** @class */ (function () {
    function JewelryModel(jewelryModel) {
        var _this = this;
        this.nameKey = jewelryModel.nameKey;
        this.id = jewelryModel.id;
        this.basePrice = jewelryModel.basePrice;
        this.imagesPattern = jewelryModel.imagesPattern;
        this.priceExpression = jewelryModel.priceExpression;
        this.modelState = jewelryModel.modelState;
        this.configurations = jewelryModel.configurations.map(function (c) { return new ModelConfiguration(c, _this); });
    }
    Object.defineProperty(JewelryModel.prototype, "modelStateNameKey", {
        get: function () {
            return JewelryModelState[this.modelState];
        },
        enumerable: true,
        configurable: true
    });
    return JewelryModel;
}());
exports.JewelryModel = JewelryModel;
var ModelConfiguration = /** @class */ (function () {
    function ModelConfiguration(modelConfig, parent) {
        this.nameKey = modelConfig.nameKey;
        this.id = modelConfig.id;
        this.identifier = modelConfig.identifier;
        this.jewelryModelId = modelConfig.jewelryModelId;
        this.configurationType = modelConfig.configurationType;
        this.configurationOptions = modelConfig.configurationOptions;
        this.modelState = parent.modelState;
    }
    Object.defineProperty(ModelConfiguration.prototype, "configurationTypeNameKey", {
        get: function () {
            return getJewelryModelConfigTypeKey(this.configurationType);
        },
        enumerable: true,
        configurable: true
    });
    return ModelConfiguration;
}());
exports.ModelConfiguration = ModelConfiguration;
var JewelryModelState;
(function (JewelryModelState) {
    JewelryModelState[JewelryModelState["BuildingState"] = -1] = "BuildingState";
    JewelryModelState[JewelryModelState["Disabled"] = 0] = "Disabled";
    JewelryModelState[JewelryModelState["Enabled"] = 1] = "Enabled";
})(JewelryModelState = exports.JewelryModelState || (exports.JewelryModelState = {}));
var JewelryModelConfigType;
(function (JewelryModelConfigType) {
    JewelryModelConfigType[JewelryModelConfigType["Options"] = 1] = "Options";
    JewelryModelConfigType[JewelryModelConfigType["Number"] = 2] = "Number";
})(JewelryModelConfigType = exports.JewelryModelConfigType || (exports.JewelryModelConfigType = {}));
function getJewelryModelConfigTypeKey(value) {
    return "modelConfig.configName." + JewelryModelConfigType[value];
}
exports.getJewelryModelConfigTypeKey = getJewelryModelConfigTypeKey;
//# sourceMappingURL=models.js.map