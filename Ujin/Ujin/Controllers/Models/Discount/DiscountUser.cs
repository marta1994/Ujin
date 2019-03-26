using Ujin.Controllers.Attributes;

namespace Ujin.Controllers.Models.Discount
{
    public class DiscountUser
    {
        [NonEmptyString]
        public string Name { get; set; }

        [ValidPhone]
        public string Phone { get; set; }

        [ValidEmail]
        public string Email { get; set; }
    }
}
