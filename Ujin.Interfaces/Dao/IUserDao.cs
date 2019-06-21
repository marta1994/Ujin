using System.Collections.Generic;
using System.Threading.Tasks;
using Ujin.Domain.Dtos;

namespace Ujin.Interfaces.Dao
{
    public interface IUserDao
    {
        Task<int> AddUser(UserDto user);

        Task<List<UserDto>> LoadUsers();

        Task<UserDto> GetByEmail(string email);
    }
}
