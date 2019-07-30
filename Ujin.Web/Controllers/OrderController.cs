using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Ujin.Domain.Dtos;
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
        public async Task<IActionResult> CreateOrder([FromBody]OrderData orderData)
        {
            try
            {
                var products = orderData.Products
                    .Select(p => new OrderedProductDto { Sku = p.Sku, Number = p.Number }).ToList();
                await _orderService.MakeOrder(orderData.User, products, orderData.Advance, orderData.Advance);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
            return Ok();
        }
    }
}
