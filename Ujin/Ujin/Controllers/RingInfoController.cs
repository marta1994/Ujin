using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Ujin.Controllers.Models.RingInfo;
using Ujin.Interfaces;

namespace Ujin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RingInfoController : ControllerBase
    {
        private readonly IRingInfoService ringInfoService;

        public RingInfoController(IRingInfoService ringInfoService)
        {
            this.ringInfoService = ringInfoService;
        }

        [HttpGet("[action]")]
        public async Task<RingInfo> RingInfo([FromQuery]RingConfig config)
        {
            return await ringInfoService.GetRingInfo(config);
        }
    }
}