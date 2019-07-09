using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ujin.Interfaces;

namespace Ujin.Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PriceController : ControllerBase
    {
        private readonly IJewelryModelService _jewelryModelService;

        public PriceController(IJewelryModelService jewelryModelService)
        {
            _jewelryModelService = jewelryModelService;
        }

        [HttpGet("[action]")]
        public async Task<decimal> Price([FromQuery]string sku)
        {
            return (await _jewelryModelService.GetModelInfo(sku)).Price;
        }
    }
}