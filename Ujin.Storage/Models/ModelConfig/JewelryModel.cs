using System.Collections.Generic;

namespace Ujin.Storage.Models.ModelConfig
{
    internal class JewelryModel : NamedModel
    {
        public virtual List<ModelConfiguration> Configurations { get; set; }

        public string ImagesPattern { get; set; }

        public double BasePrice { get; set; }

        public string PriceExpression { get; set; }
    }
}
