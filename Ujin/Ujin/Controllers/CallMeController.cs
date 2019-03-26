using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Ujin.Controllers.Models.CallMe;
using Ujin.Interfaces;

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
            await userService.ProcessCallMeUser(user);
        }
    }
}