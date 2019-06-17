using System.Threading.Tasks;
using Ujin.Domain.Dtos.Admin;

namespace Ujin.Interfaces.Dao
{
    public interface IAdminUserDao
    {
        Task<AdminUserDto> GetUserByUsername(string username);
    }
}
