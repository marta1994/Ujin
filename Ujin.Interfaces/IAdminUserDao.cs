using System.Threading.Tasks;
using Ujin.Domain.Dtos.Admin;

namespace Ujin.Interfaces
{
    public interface IAdminUserDao
    {
        Task<AdminUserDto> GetUserByUsername(string username);
    }
}
