namespace Ujin.Domain.Dtos
{
    public class OrderDto
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string Sku { get; set; }

        public string SerializedProduct { get; set; }

        public decimal Price { get; set; }

        public decimal Advance { get; set; }
    }
}
