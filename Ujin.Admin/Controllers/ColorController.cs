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
    public class ColorController : ControllerBase
    {
        private readonly IColorService _colorService;

        public ColorController(IColorService colorService)
        {
            _colorService = colorService;
        }

        [HttpGet("[action]")]
        public Task<List<ColorDto>> Colors()
        {
            return _colorService.LoadColors();
        }

        [HttpPost("[action]")]
        public Task SaveColors([FromBody]List<ColorDto> gemSources)
        {
            return _colorService.SaveColors(gemSources);
        }
    }
}