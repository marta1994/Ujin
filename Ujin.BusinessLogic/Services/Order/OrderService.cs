using Newtonsoft.Json;
using System.Threading.Tasks;
using Ujin.BusinessLogic.Services.Model;
using Ujin.Domain.Dtos;
using Ujin.Domain.Enums;
using Ujin.Interfaces;
using Ujin.Interfaces.Dao;

namespace Ujin.BusinessLogic.Services.Order
{
    public class OrderService : IOrderService
    {
        private readonly IUserDao _userDao;

        private readonly IOrderDao _orderDao;

        private readonly ModelParser _modelParser;

        public OrderService(
            IUserDao userDao,
            IOrderDao orderDao,
            ModelParser modelParser)
        {
            _userDao = userDao;
            _orderDao = orderDao;
            _modelParser = modelParser;
        }

        public async Task MakeOrder(UserDto userDto, string sku, decimal price, decimal advance)
        {
            var user = await _userDao.GetByEmail(userDto.Email);
            if (user == null)
            {
                user = userDto;
                user.CreationSource = UserCreationSource.MadeOrder;
                user.SubscriptionOptions = SubscriptionOption.All;
                user.Id = await _userDao.AddUser(user);
            };

            var model = await _modelParser.ParseFromSku(sku);
            var serialized = JsonConvert.SerializeObject(model);

            var order = new OrderDto
            {
                Id = -1,
                UserId = user.Id,
                Price = price,
                Advance = advance,
                Sku = sku,
                SerializedProduct = serialized
            };

            await _orderDao.AddOrder(order);
        }
    }
}
