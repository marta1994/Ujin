using System.Threading.Tasks;
using Ujin.Models.CallMe;

namespace Ujin.Interfaces
{
    public interface IUserService
    {
        Task ProcessCallMeUser(CallMeUser user);
    }
}
