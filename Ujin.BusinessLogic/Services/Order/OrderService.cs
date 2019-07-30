using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ujin.BusinessLogic.Services.Model;
using Ujin.Domain;
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

        private readonly IMailSender _mailSender;

        private readonly MailSettings _mailSettings;

        public OrderService(
            IUserDao userDao,
            IOrderDao orderDao,
            ModelParser modelParser,
            IMailSender mailSender,
            AppSettings appSettingsOptions)
        {
            _userDao = userDao;
            _orderDao = orderDao;
            _modelParser = modelParser;
            _mailSender = mailSender;
            _mailSettings = appSettingsOptions.MailSettings;
        }

        public async Task MakeOrder(
            UserDto userDto, 
            List<OrderedProductDto> orderedProducts, 
            decimal price,
            decimal advance)
        {
            var user = await _userDao.GetByEmail(userDto.Email);
            if (user == null)
            {
                user = userDto;
                user.CreationSource = UserCreationSource.MadeOrder;
                user.SubscriptionOptions = SubscriptionOption.All;
                user.Id = await _userDao.AddUser(user);
            };

            var tasks = orderedProducts.Select(op => _modelParser.ParseFromSku(op.Sku));
            var models = (await Task.WhenAll(tasks)).GroupBy(m => m.Sku).ToDictionary(m => m.Key, m => m.First());
            foreach(var prod in orderedProducts)
            {
                prod.SerializedProduct = JsonConvert.SerializeObject(models[prod.Sku], Formatting.Indented);
            }

            var order = new OrderDto
            {
                UserId = user.Id,
                Price = price,
                Advance = advance,
                OrderedProducts = orderedProducts
            };

            await _orderDao.AddOrder(order);
            await _mailSender.SendMessage(new SimpleMail
            {
                From = _mailSettings.SupportMail,
                To = _mailSettings.MailTo,
                Subject = "Ujin jewelry: new order",
                Body = GenerateMailMessage(order, user)
            });
        }

        private string GenerateMailMessage(OrderDto order, UserDto user)
        {
            return $@"
There was a new order placed by a user at Ujin jewelry.

User name: {user.Name},
User email: {user.Email},
User phone number: {user.Phone},
User surname: {user.Surname};

Price: {order.Price} uah,
Advance: {order.Advance} uah,

Order Information: 
{string.Join(";\r\n", order.OrderedProducts.Select(op => $"Sku: {op.Sku}, Number: {op.Number}, Data: {op.SerializedProduct}"))}
                    ";
        }
    }
}
