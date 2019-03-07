using Microsoft.AspNetCore.Mvc;
using Ujin.UserAgent;

namespace Ujin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAgentController : ControllerBase
    {
        private readonly IUserAgentHelper userAgentController;

        public UserAgentController(IUserAgentHelper userAgentController)
        {
            this.userAgentController = userAgentController;
        }

        [HttpGet("[action]")]
        public DeviceType DetermineDeviceType()
        {
            return userAgentController.DetermineDeviceType(HttpContext);
        }
    }
}