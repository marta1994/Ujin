using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Domain.Dtos.ModelConfig.Parsed;
using Ujin.Domain.Enums;

namespace Ujin.BusinessLogic.Services.Model.SelectedItems
{
    internal class OptionsSelectedItem : BaseSelectedItem<object, SelectorOptions>
    {
        public OptionsSelectedItem(
            string value,
            SelectorOptions options) : base()
        {
            _options = options;
            _value = ParseValue(value);
        }

        protected override object ParseValue(string val)
        {
            object result = null;
            val = val != null ? val.ToLower() : string.Empty;
            switch (_options.OptionsSource)
            {
                case OptionsSource.Metal:
                    result = _options.MetalSource.SingleOrDefault(m => m.Identifier.ToLower() == val);
                    break;
                case OptionsSource.Gemstone:
                    result = _options.GemstoneSource.SingleOrDefault(g => g.Identifier.ToLower() == val);
                    break;
                case OptionsSource.Custom:
                    result = _options.CustomOptions.SingleOrDefault(o => o.Identifier.ToLower() == val);
                    break;
            }
            if (result == null)
                throw new ApplicationException($"Invalid option odentifier '{val}', optSource: '{_options.OptionsSource}'");
            return result;
        }

        public override JewelryModelConfigType ConfigType => JewelryModelConfigType.Options;

        public override string SkuValue
        {
            get
            {
                switch (_options.OptionsSource)
                {
                    case OptionsSource.Metal:
                        var metal = (MetalDto)_value;
                        return metal.Identifier;
                    case OptionsSource.Gemstone:
                        var gem = (GemstoneDto)_value;
                        return gem.Identifier;
                    case OptionsSource.Custom:
                        var opt = (CustomOption)_value;
                        return opt.Identifier;
                }
                return null;
            }
        }

        public override string GetStrValueByPath(string path)
        {
            path = path.ToLower();
            switch (_options.OptionsSource)
            {
                case OptionsSource.Metal:
                    var metal = (MetalDto)_value;
                    if (path == "pricepergram") return metal.PricePerGram.ToString(CultureInfo.InvariantCulture);
                    if (path == "gramsperml") return metal.GramsPerMl.ToString(CultureInfo.InvariantCulture);
                    if (path == "identifier") return metal.Identifier;
                    break;
                case OptionsSource.Gemstone:
                    var gem = (GemstoneDto)_value;
                    if (path == "identifier") return gem.Identifier;
                    if (path == "gemsource.identifier") return gem.GemstoneSource.Identifier;
                    if (path == "gemcut.identifier") return gem.GemstoneCut.Identifier;
                    if (path == "gemclass.identifier") return gem.GemstoneClass.Identifier;
                    if (path == "price") return gem.Price.ToString();
                    break;
                case OptionsSource.Custom:
                    var opt = (CustomOption)_value;
                    if (path == "identifier") return opt.Identifier;
                    if (path == "value") return opt.Value.ToString(CultureInfo.InvariantCulture);
                    break;
            }
            throw new ApplicationException($"Could not parse option selected item '{path}'");
        }
    }
}
