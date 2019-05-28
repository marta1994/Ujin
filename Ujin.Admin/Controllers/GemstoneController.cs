using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ujin.Domain.ModelConfig;
using Ujin.Interfaces;

namespace Ujin.Admin.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GemstoneController : ControllerBase
    {
        private readonly IGemstoneService _gemstoneService;

        public GemstoneController(IGemstoneService gemstoneService)
        {
            _gemstoneService = gemstoneService;
        }

        [HttpGet("[action]")]
        public Task<List<GemSourceDto>> GemSources()
        {
            return _gemstoneService.LoadGemSources();
        }

        [HttpPost("[action]")]
        public Task SaveGemSources([FromBody]List<GemSourceDto> gemSources)
        {
            return _gemstoneService.SaveGemSources(gemSources);
        }
    }
}