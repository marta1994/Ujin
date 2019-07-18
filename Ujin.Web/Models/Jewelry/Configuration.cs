using Ujin.Domain.Dtos.ModelConfig.Parsed;
using Ujin.Domain.Enums;

namespace Ujin.Web.Server.Models.Jewelry
{
    public class Configuration
    {
        public string NameKey { get; set; }

        public string Identifier { get; set; }

        public int Order { get; set; }

        public string Value { get; set; }

        public JewelryModelConfigType ConfigurationType { get; set; }

        public BaseConfigOptions ConfigOptions { get; set; }
    }
}
