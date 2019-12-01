namespace Ujin.Storage.Models.ModelConfig
{
    internal class SkuDescription: BaseModel
    {
        public string Sku { get; set; }

        public string Images { get; set; }

        public int JewelryModelId { get; set; }

        public JewelryModel JewelryModel { get; set; }

        public bool IsEnabled { get; set; }

        public bool UseInCatalog { get; set; }

        public string Tags { get; set; }
    }
}
