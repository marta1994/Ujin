using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ujin.Interfaces;
using Ujin.Web.Models;

namespace Ujin.Web.Controllers
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
        public async Task<IActionResult> CreateOrder(OrderData orderData)
        {
            try
            {
                await _orderService.MakeOrder(orderData.User, orderData.Sku, orderData.Advance, orderData.Advance);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
            return Ok();
        }
    }
}
