using System.Collections.Generic;
using Ujin.Domain.Enums;

namespace Ujin.Domain.Dtos
{
    public class OrderDto
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public decimal Price { get; set; }

        public decimal Advance { get; set; }

        public OrderState OrderState { get; set; }

        public virtual List<OrderedProductDto> OrderedProducts { get; set; }
    }
}
