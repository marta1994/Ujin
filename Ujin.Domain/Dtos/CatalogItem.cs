using System.Collections.Generic;

namespace Ujin.Domain.Dtos
{
    public class CatalogItem
    {
        public string Sku { get; set; }

        public string ModelIdentifier { get; set; }

        public string ImagePath { get; set; }

        public decimal Price { get; set; }

        public List<string> Tags { get; set; }

        public List<string> DisplayNameParts { get; set; }
        
        public List<string> DescriptionParts { get; set; }
    }
}
