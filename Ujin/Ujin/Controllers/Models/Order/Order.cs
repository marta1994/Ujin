using Ujin.Controllers.Attributes;

namespace Ujin.Controllers.Models.Order
{
    public class Order
    {
        [NonEmptyString]
        public string Definition { get; set; }
    }
}
