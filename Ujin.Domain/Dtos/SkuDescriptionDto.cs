using Ujin.Domain.Enums;

namespace Ujin.Domain.Dtos
{
    public class SkuDescriptionDto
    {
        public int Id { get; set; }

        public string Sku { get; set; }

        public string Images { get; set; }

        public int JewelryModelId { get; set; }

        public bool IsEnabled { get; set; }

        public bool UseInCatalog { get; set; }

        public string Tags { get; set; }

        public ProductLabel ProductLabel { get; set; }
    }
}
