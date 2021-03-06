using System.Collections.Generic;
using Ujin.BusinessLogic.Services.Model.SelectedItems;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Domain.Dtos.ModelConfig.Parsed;
using Ujin.Domain.Enums;

namespace Ujin.BusinessLogic.Services.Model
{
    public class SpecificModelConfig
    {
        private readonly ParsedModelConfig _modelConfig;

        public SpecificModelConfig(
            ParsedModelConfig modelConfig, 
            string selectedItem)
        {
            _modelConfig = modelConfig;
            switch (modelConfig.ConfigurationType)
            {
                case JewelryModelConfigType.Number:
                    SelectedItem = new NumberSelectedItem(selectedItem, (NumberOptions)modelConfig.ConfigOptions);
                    break;
                case JewelryModelConfigType.Options:
                    SelectedItem = new OptionsSelectedItem(
                        selectedItem,
                        (SelectorOptions)modelConfig.ConfigOptions);
                    break;
            }
        }

        public int Id => _modelConfig.Id;

        public string NameKey => _modelConfig.NameKey;

        public int JewelryModelId => _modelConfig.JewelryModelId;

        public string Identifier => _modelConfig.Identifier;

        public int Order => _modelConfig.Order;

        public JewelryModelConfigType ConfigType => _modelConfig.ConfigurationType;

        public IModelSelectedItem SelectedItem { get; set; }
    }
}
