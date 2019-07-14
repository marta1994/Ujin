using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Ujin.Domain.Enums;

namespace Ujin.Storage.Models.ModelConfig
{
    internal class JewelryModel : NamedModel
    {
        [Required]
        public string Identifier { get; set; }

        public virtual List<ModelConfiguration> Configurations { get; set; }

        public string ImagesPattern { get; set; }

        public string PriceExpression { get; set; }

        public string WeightExpression { get; set; }

        public string DescriptionKey { get; set; }
        
        public JewelryModelState ModelState { get; set; }

        public virtual List<SkuDescription> SkuDescriptions { get; set; }
    }
}
