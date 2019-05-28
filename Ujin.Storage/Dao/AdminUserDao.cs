using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.Admin;
using Ujin.Interfaces;

namespace Ujin.Storage.Dao
{
    public class AdminUserDao : IAdminUserDao
    {
        private readonly UjinContext _dbContext;

        private readonly IMapper _mapper;

        public AdminUserDao(UjinContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<AdminUserDto> GetUserByUsername(string username)
        {
            var userList = await _dbContext.AdminUsers
                .Where(u => u.Username == username)
                .Select(u => _mapper.Map<AdminUserDto>(u))
                .ToListAsync();
            return userList.SingleOrDefault();
        }
    }
}
