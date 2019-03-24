using System.Threading.Tasks;
using Ujin.Models.CallMe;

namespace Ujin.Services
{
    public interface IUserService
    {
        Task ProcessCallMeUser(CallMeUser user);
    }
}
