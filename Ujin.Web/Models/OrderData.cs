using System.Collections.Generic;
using Ujin.Domain.Dtos;

namespace Ujin.Web.Models
{
    public class OrderData
    {
        public UserDto User { get; set; }

        public List<OrderedProduct> Products { get; set; }

        public decimal Price { get; set; }

        public decimal Advance { get; set; }
    }

    public class OrderedProduct
    {
        public string Sku { get; set; }

        public int Number { get; set; }
    }
}
