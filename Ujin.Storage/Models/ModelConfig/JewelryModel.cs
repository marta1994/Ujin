using System.Collections.Generic;
using Ujin.Domain.Enums;

namespace Ujin.Storage.Models.ModelConfig
{
    internal class JewelryModel : NamedModel
    {
        public virtual List<ModelConfiguration> Configurations { get; set; }

        public string ImagesPattern { get; set; }

        public double BasePrice { get; set; }

        public string PriceExpression { get; set; }
        
        public JewelryModelState ModelState { get; set; }
    }
}
