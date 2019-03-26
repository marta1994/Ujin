using System.Threading.Tasks;
using Ujin.Controllers.Models.CallMe;
using Ujin.Controllers.Models.Discount;
using Ujin.Controllers.Models.Order;

namespace Ujin.Interfaces
{
    public interface IUserService
    {
        Task ProcessCallMeUser(CallMeUser user);

        Task ProcessDiscountUser(DiscountUser user);

        Task ProcessUserOrder(OrderUser user);
    }
}
