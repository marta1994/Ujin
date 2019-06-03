using System.Collections.Generic;

namespace Ujin.Domain.Dtos.ModelConfig
{
    public class JewelryModelDto
    {
        public int Id { get; set; }

        public string NameKey { get; set; }

        public virtual List<ModelConfigurationDto> Configurations { get; set; }

        public string ImagesPattern { get; set; }

        public double BasePrice { get; set; }

        public string PriceExpression { get; set; }
    }
}
