using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ujin.Interfaces;

namespace Ujin.Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PriceController : ControllerBase
    {
        private readonly IPriceCalculatorService _priceCalculatorService;

        public PriceController(IPriceCalculatorService priceCalculatorService)
        {
            _priceCalculatorService = priceCalculatorService;
        }

        [HttpGet("[action]")]
        public Task<decimal> Price([FromQuery]string sku)
        {
            return _priceCalculatorService.CalculatePrice(sku);
        }
    }
}