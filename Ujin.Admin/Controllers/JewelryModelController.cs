using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Interfaces;

namespace Ujin.Admin.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class JewelryModelController : ControllerBase
    {
        private readonly IJewelryModelService _jewelryModelService;

        public JewelryModelController(IJewelryModelService jewelryModelService)
        {
            _jewelryModelService = jewelryModelService;
        }

        [HttpGet("[action]")]
        public Task<JewelryModelDto> JewelryModelById([FromQuery]int id)
        {
            return _jewelryModelService.LoadJewelryModelById(id);
        }

        [HttpGet("[action]")]
        public Task<List<JewelryModelDto>> JewelryModels()
        {
            return _jewelryModelService.LoadJewelryModels();
        }

        [HttpPost("[action]")]
        public Task SaveJewelryModel([FromBody]JewelryModelDto jewelryModel)
        {
            return _jewelryModelService.SaveJewelryModel(jewelryModel);
        }

        [HttpPost("[action]")]
        public Task EnableModel([FromBody]int modelId)
        {
            return _jewelryModelService.SetEnabledState(modelId, true);
        }

        [HttpPost("[action]")]
        public Task DisableModel([FromBody]int modelId)
        {
            return _jewelryModelService.SetEnabledState(modelId, false);
        }
    }
}