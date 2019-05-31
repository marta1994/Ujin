using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Interfaces;

namespace Ujin.Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MetalController : ControllerBase
    {
        private readonly IMetalService _metalService;

        public MetalController(IMetalService metalService)
        {
            _metalService = metalService;
        }

        [HttpGet("[action]")]
        public Task<List<MetalDto>> Metals()
        {
            return _metalService.LoadMetals();
        }

        [HttpPost("[action]")]
        public Task SaveMetals([FromBody]List<MetalDto> metals)
        {
            return _metalService.SaveMetals(metals);
        }
    }
}