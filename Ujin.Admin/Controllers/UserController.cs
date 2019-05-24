using System.Security.Authentication;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ujin.Admin.Models;
using Ujin.Interfaces;

namespace Ujin.Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAdminUserService _userService;

        public UserController(IAdminUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody]AuthUser userParam)
        {
            try
            {
                var user = await _userService.Authenticate(userParam.Username, userParam.Password);
                return Ok(user);
            }
            catch(AuthenticationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch
            {
                return BadRequest(new { message = "Something went wrong" });
            }
        }
    }
}