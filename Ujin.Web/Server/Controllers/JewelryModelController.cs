using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Ujin.Domain.Dtos;
using Ujin.Domain.Dtos.ModelConfig.Parsed;
using Ujin.Domain.Enums;
using Ujin.Interfaces;
using Ujin.Web.Server.Models.Jewelry;

namespace Ujin.Web.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JewelryModelController : ControllerBase
    {
        private const string ImagesDir = "wwwroot/assets/images/widget/";

        private readonly IJewelryModelService _jewelryModelService;

        private readonly IModelImageService _modelImageService;

        private readonly IMapper _mapper;

        public JewelryModelController(
            IJewelryModelService jewelryModelService,
            IModelImageService modelImageService,
            IMapper mapper)
        {
            _jewelryModelService = jewelryModelService;
            _modelImageService = modelImageService;
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

        [HttpGet("[action]")]
        public async Task<IActionResult> WidgetImage([FromQuery]string sku, [FromQuery]int index = 0)
        {
            if (index < 0) return NotFound();
            var images = await _modelImageService.GetImagesPath(sku);
            if (index >= images.Count) return NotFound();
            var fullPath = Path.Combine(ImagesDir, images[index]);
            var image = System.IO.File.OpenRead(fullPath);
            var extension = fullPath.Split('.').Last();
            return File(image, $"image/{extension}");
        }

        [HttpGet("[action]")]
        public async Task<ModelInfo> GetModelInfo([FromQuery]string sku)
        {
            throw new Exception();
        }
    }
}
