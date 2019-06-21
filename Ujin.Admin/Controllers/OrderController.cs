using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ujin.Admin.Models;
using Ujin.Interfaces;

namespace Ujin.Admin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("[action]")]
        public Task CreateOrder([FromBody]OrderData orderData)
        {
            return _orderService.MakeOrder(orderData.User, orderData.Sku, orderData.Price, orderData.Advance);
        }
    }
}