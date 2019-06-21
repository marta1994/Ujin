namespace Ujin.Storage.Models
{
    internal class Order : BaseModel
    {
        public int UserId { get; set; }

        public virtual User User { get; set; }

        public string Sku { get; set; }

        public string SerializedProduct { get; set; }

        public decimal Price { get; set; }

        public decimal Advance { get; set; }
    }
}
