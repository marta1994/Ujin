using System.Collections.Generic;
using Ujin.Domain.Enums;

namespace Ujin.Domain.Dtos.ModelConfig.Parsed
{
    public class ParsedJewelryModel
    {
        public int Id { get; set; }

        public string NameKey { get; set; }

        public string Identifier { get; set; }

        public virtual List<ParsedModelConfig> Configurations { get; set; }

        public string ImagesPattern { get; set; }

        public string PriceExpression { get; set; }

        public JewelryModelState ModelState { get; set; }
    }
}
