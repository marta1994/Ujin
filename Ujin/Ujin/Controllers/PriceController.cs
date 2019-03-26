using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Ujin.Controllers.Models.Price;
using Ujin.Interfaces;

namespace Ujin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PriceController : ControllerBase
    {
        private readonly IPriceService priceService;

        public PriceController(IPriceService priceService)
        {
            this.priceService = priceService;
        }

        [HttpGet("[action]")]
        public async Task<decimal> RingPrice([FromQuery]RingConfig config)
        {
            return await priceService.CalculateRingPrice(config);
        }
    }
}