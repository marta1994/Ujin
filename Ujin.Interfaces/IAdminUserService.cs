using System.Threading.Tasks;
using Ujin.Domain.Dtos.Admin;

namespace Ujin.Interfaces
{
    public interface IAdminUserService
    {
        Task<AdminUserDto> Authenticate(string username, string password);
    }
}
