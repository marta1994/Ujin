namespace Ujin.Storage.Models
{
    internal class OrderedProduct : BaseModel
    {
        public int OrderId { get; set; }

        public virtual Order Order { get; set; }

        public string Sku { get; set; }

        public string SerializedProduct { get; set; }

        public int Number { get; set; }
    }
}
