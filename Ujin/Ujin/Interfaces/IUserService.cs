using System.Threading.Tasks;
using Ujin.Controllers.Models.CallMe;

namespace Ujin.Interfaces
{
    public interface IUserService
    {
        Task ProcessCallMeUser(CallMeUser user);
    }
}
