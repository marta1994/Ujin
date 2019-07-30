using System.Collections.Generic;
using System.Threading.Tasks;
using Ujin.Domain.Dtos;

namespace Ujin.Interfaces
{
    public interface IOrderService
    {
        Task MakeOrder(UserDto userDto, List<OrderedProductDto> orderedProducts, decimal price, decimal advance);
    }
}
