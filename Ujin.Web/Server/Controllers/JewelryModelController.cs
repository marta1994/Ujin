using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ujin.Interfaces;
using Ujin.Web.Server.Models.Jewelry;

namespace Ujin.Web.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JewelryModelController : ControllerBase
    {
        private readonly IJewelryModelService _jewelryModelService;

        private readonly IMapper _mapper;

        public JewelryModelController(
            IJewelryModelService jewelryModelService,
            IMapper mapper)
        {
            _jewelryModelService = jewelryModelService;
            _mapper = mapper;
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> LoadModelByIdentifier(
            [FromQuery]string identifier, 
            [FromQuery]string sku)
        {
            var parsedModel = await _jewelryModelService.GetActiveJewelryModelByIdentifier(identifier);
            if (parsedModel == null)
                return NotFound();

            var model = _mapper.Map<JewelryModel>(parsedModel);
            if (string.IsNullOrEmpty(sku))
                return Ok(model);
            var values = await _jewelryModelService.GetOrderedValues(sku, identifier);
            for(var i = 0; i < model.Configurations.Count; ++i)
            {
                model.Configurations[i].Value = values[i];
            }

            return Ok(model);
        }
    }
}
