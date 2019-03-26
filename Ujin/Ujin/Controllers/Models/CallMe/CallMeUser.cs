using Ujin.Controllers.Attributes;

namespace Ujin.Controllers.Models.CallMe
{
    public class CallMeUser
    {
        [NonEmptyString]
        public string Name { get; set; }

        [ValidPhone]
        public string Phone { get; set; }
    }
}
