using System.Threading.Tasks;
using Ujin.Domain.Dtos;

namespace Ujin.Interfaces
{
    public interface IOrderService
    {
        Task MakeOrder(UserDto userDto, string sku, decimal price, decimal advance);
    }
}
