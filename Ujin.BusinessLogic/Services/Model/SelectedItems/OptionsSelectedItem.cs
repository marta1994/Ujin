using System;
using System.Collections.Generic;
using System.Linq;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Domain.Dtos.ModelConfig.Parsed;
using Ujin.Domain.Enums;

namespace Ujin.BusinessLogic.Services.Model.SelectedItems
{
    internal class OptionsSelectedItem : BaseSelectedItem<object, SelectorOptions>
    {
        private readonly List<MetalDto> _availableMetals;

        private readonly List<GemstoneDto> _availableGemstones;

        public OptionsSelectedItem(
            string value, 
            SelectorOptions options,
            List<MetalDto> availableMetals,
            List<GemstoneDto> availableGemstones) : base()
        {
            _availableMetals = availableMetals;
            _availableGemstones = availableGemstones;
            _options = options;
            _value = ParseValue(value);
        }

        protected override object ParseValue(string val)
        {
            object result = null;
            switch(_options.OptionsSource)
            {
                case OptionsSource.Metal:
                    result = _availableMetals.SingleOrDefault(m => m.Identifier == val);
                    break;
                case OptionsSource.Gemstone:
                    result = _availableGemstones.SingleOrDefault(g => g.Identifier == val);
                    break;
                case OptionsSource.Custom:
                    result = _options.CustomOptions.SingleOrDefault(o => o.Identifier == val);
                    break;
            }
            if (result == null)
                throw new ApplicationException($"Invalid option odentifier '{val}', optSource: '{_options.OptionsSource}'");
            return result;
        }

        public override JewelryModelConfigType ConfigType => JewelryModelConfigType.Options;

        public override string GetStrValueByPath(string path)
        {
            switch(_options.OptionsSource)
            {
                case OptionsSource.Metal:
                    var metal = (MetalDto)_value;
                    if (path == "pricePerGram") return metal.PricePerGram.ToString();
                    if (path == "gramsPerMl") return metal.GramsPerMl.ToString();
                    if (path == "identifier") return metal.Identifier;
                    break;
                case OptionsSource.Gemstone:
                    var gem = (GemstoneDto)_value;
                    if (path == "identifier") return gem.Identifier;
                    if (path == "gemSource.identifier") return gem.GemstoneSource.Identifier;
                    if (path == "gemCut.identifier") return gem.GemstoneCut.Identifier;
                    if (path == "gemClass.identifier") return gem.GemstoneClass.Identifier;
                    if (path == "price") return gem.Price.ToString();
                    break;
                case OptionsSource.Custom:
                    var opt = (CustomOption)_value;
                    if (path == "identifier") return opt.Identifier;
                    if (path == "value") return opt.Value.ToString();
                    break;
            }
            throw new ApplicationException($"Could not parse option selected item '{path}'");
        }
    }
}
