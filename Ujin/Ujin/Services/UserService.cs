using System.Threading.Tasks;
using Ujin.Data;
using Ujin.Data.Enums;
using Ujin.Data.Models;
using Ujin.Models.CallMe;

namespace Ujin.Services
{
    public class UserService: IUserService
    {
        private readonly UjinContext ujinContext;

        public UserService(UjinContext ujinContext)
        {
            this.ujinContext = ujinContext;
        }

        public async Task ProcessCallMeUser(CallMeUser user)
        {
            var efUser = new User
            {
                Name = user.Name,
                Phone = user.Phone,
                CreationSource = UserCreationSource.RequestedCallBack,
                SubscriptionOptions = SubscriptionOption.Viber
            };
            ujinContext.Users.Add(efUser);
            await ujinContext.SaveChangesAsync();
        }
    }
}
