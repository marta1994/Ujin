using Ujin.Domain.Dtos;

namespace Ujin.Admin.Models
{
    public class OrderData
    {
        public UserDto User { get; set; }

        public string Sku { get; set; }

        public decimal Price { get; set; }

        public decimal Advance { get; set; }
    }
}
