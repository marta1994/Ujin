using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ujin.Domain.Dtos;
using Ujin.Interfaces;

namespace Ujin.Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkuDataController : ControllerBase
    {
        private readonly IJewelryModelService _jewelryModelService;

        private readonly ISkuDescriptionService _skuDescriptionService;

        public SkuDataController(
            IJewelryModelService jewelryModelService,
            ISkuDescriptionService skuDescriptionService)
        {
            _jewelryModelService = jewelryModelService;
            _skuDescriptionService = skuDescriptionService;
        }

        [HttpGet("[action]")]
        public Task<ModelInfo> Data([FromQuery]string sku)
        {
            return _jewelryModelService.GetModelInfo(sku);
        }

        [HttpGet("[action]")]
        public Task<List<SkuDescriptionDto>> SkuDescriptionsByModelId([FromQuery]int modelId)
        {
            return _skuDescriptionService.LoadSkuDescriptionsByModelId(modelId);
        }

        [HttpPost("[action]")]
        public Task UpdateModelSkusEnabledState([FromBody]int modelId)
        {
            return _skuDescriptionService.UpdateSkuEnabledStateForModel(modelId);
        }

        [HttpGet("[action]")]
        public Task<SkuDescriptionDto> SkuDescription([FromQuery]string sku)
        {
            return _skuDescriptionService.LoadSkuDescription(sku);
        }

        [HttpPost("[action]")]
        public Task SaveSkuDescriptions([FromBody]List<SkuDescriptionDto> skuDescriptions)
        {
            return _skuDescriptionService.SaveSkuDescriptions(skuDescriptions);
        }
    }
}