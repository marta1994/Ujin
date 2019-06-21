using AutoMapper;
using System.Threading.Tasks;
using Ujin.Domain.Dtos;
using Ujin.Interfaces.Dao;
using Ujin.Storage.Models;

namespace Ujin.Storage.Dao
{
    public class OrderDao : IOrderDao
    {
        private readonly UjinContext _dbContext;

        private readonly IMapper _mapper;

        public OrderDao(UjinContext context, IMapper mapper)
        {
            _dbContext = context;
            _mapper = mapper;
        }

        public Task AddOrder(OrderDto order)
        {
            order.Id = -1;
            var orderEntity = _mapper.Map<Order>(order);
            return _dbContext.UpsertEntities(new[] { orderEntity });
        }
    }
}
