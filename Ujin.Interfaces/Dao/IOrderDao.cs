using System.Threading.Tasks;
using Ujin.Domain.Dtos;

namespace Ujin.Interfaces.Dao
{
    public interface IOrderDao
    {
        Task AddOrder(OrderDto order);
    }
}
