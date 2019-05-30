using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Ujin.Domain.Dtos.ModelConfig;
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

        [HttpGet("[action]")]
        public Task<List<GemClassDto>> GemClasses()
        {
            return _gemstoneService.LoadGemClasses();
        }

        [HttpGet("[action]")]
        public Task<List<GemCutDto>> GemCuts()
        {
            return _gemstoneService.LoadGemCuts();
        }

        [HttpGet("[action]")]
        public Task<List<GemstoneDto>> Gemstones()
        {
            return _gemstoneService.LoadGemstones();
        }

        [HttpPost("[action]")]
        public Task SaveGemSources([FromBody]List<GemSourceDto> gemSources)
        {
            return _gemstoneService.SaveGemSources(gemSources);
        }

        [HttpPost("[action]")]
        public Task SaveGemClasses([FromBody]List<GemClassDto> gemClasses)
        {
            return _gemstoneService.SaveGemClasses(gemClasses);
        }

        [HttpPost("[action]")]
        public Task SaveGemCuts([FromBody]List<GemCutDto> gemCuts)
        {
            return _gemstoneService.SaveGemCuts(gemCuts);
        }

        [HttpPost("[action]")]
        public Task SaveGemstones([FromBody]List<GemstoneDto> gemstones)
        {
            return _gemstoneService.SaveGemstones(gemstones);
        }
    }
}