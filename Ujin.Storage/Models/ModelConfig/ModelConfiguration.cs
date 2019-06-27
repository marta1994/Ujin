using System.ComponentModel.DataAnnotations;
using Ujin.Domain.Enums;

namespace Ujin.Storage.Models.ModelConfig
{
    internal class ModelConfiguration: NamedModel
    {
        [Required]
        public string Identifier { get; set; }

        public int Order { get; set; }

        public int JewelryModelId { get; set; }

        public virtual JewelryModel JewelryModel { get; set; }

        public JewelryModelConfigType ConfigurationType { get; set; }

        public string ConfigurationOptions { get; set; }
    }
}
