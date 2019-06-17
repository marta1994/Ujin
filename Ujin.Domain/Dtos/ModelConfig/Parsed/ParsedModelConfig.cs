using Ujin.Domain.Enums;

namespace Ujin.Domain.Dtos.ModelConfig.Parsed
{
    public class ParsedModelConfig
    {
        public int Id { get; set; }

        public string NameKey { get; set; }

        public string Identifier { get; set; }

        public int JewelryModelId { get; set; }

        public JewelryModelConfigType ConfigurationType { get; set; }

        public BaseConfigOptions ConfigOptions { get; set; }
    }
}
