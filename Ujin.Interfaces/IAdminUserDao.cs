using System.Threading.Tasks;
using Ujin.Domain.Admin;

namespace Ujin.Interfaces
{
    public interface IAdminUserDao
    {
        Task<AdminUserDto> GetUserByUsername(string username);
    }
}
