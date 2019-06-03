using Ujin.Domain.Enums;

namespace Ujin.Domain.Dtos.ModelConfig
{
    public class ModelConfigurationDto
    {
        public int Id { get; set; }

        public string NameKey { get; set; }

        public int JewelryModelId { get; set; }

        public JewelryModelConfigType ConfigurationType { get; set; }

        public string ConfigurationOptions { get; set; }
    }
}
