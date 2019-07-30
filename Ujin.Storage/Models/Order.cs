using System.Collections.Generic;
using Ujin.Domain.Enums;

namespace Ujin.Storage.Models
{
    internal class Order : BaseModel
    {
        public int UserId { get; set; }

        public virtual User User { get; set; }

        public decimal Price { get; set; }

        public decimal Advance { get; set; }

        public OrderState OrderState { get; set; }

        public virtual List<OrderedProduct> OrderedProducts { get; set; }
    }
}
