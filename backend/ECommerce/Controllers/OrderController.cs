using ECommerce.Models;
using ECommerce.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly OrderService _orderService;

        public OrderController(OrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Order>>> Get()
        {
            var orders = await _orderService.GetAsync();
            return Ok(orders);
        }

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Order>> Get(string id)
        {
            var order = await _orderService.GetAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        [HttpPost]
        public async Task<ActionResult<Order>> Create(Order order)
        {
            try
            {
            await _orderService.CreateAsync(order);

            }
            catch (Exception ex)
            {

                throw;
            }
            return CreatedAtAction(nameof(Get), new { id = order.Id }, order);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Order orderIn)
        {
            var order = await _orderService.GetAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            await _orderService.UpdateAsync(id, orderIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var order = await _orderService.GetAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            await _orderService.RemoveAsync(id);

            return NoContent();
        }
    }
}
