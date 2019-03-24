using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Ujin.Models.CallMe;
using Ujin.Services;

namespace Ujin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CallMeController : ControllerBase
    {
        private readonly IUserService userService;

        public CallMeController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost("[action]")]
        public async Task PostCallMeData(CallMeUser user)
        {
            if (user == null || !user.IsValid)
                throw new InvalidOperationException($"Invalid user param! {user}");
            await userService.ProcessCallMeUser(user);
        }
    }
}