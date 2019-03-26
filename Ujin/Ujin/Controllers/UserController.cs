using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Ujin.Controllers.Models.CallMe;
using Ujin.Controllers.Models.Discount;
using Ujin.Controllers.Models.Order;
using Ujin.Interfaces;

namespace Ujin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost("[action]")]
        public async Task PostCallMeData(CallMeUser user)
        {
            await userService.ProcessCallMeUser(user);
        }

        [HttpPost("[action]")]
        public async Task PostOrderData(OrderUser user)
        {
            await userService.ProcessUserOrder(user);
        }

        [HttpPost("[action]")]
        public async Task PostDiscountData(DiscountUser user)
        {
            await userService.ProcessDiscountUser(user);
        }
    }
}