using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ujin.Domain.Dtos;
using Ujin.Interfaces.Dao;
using Ujin.Storage.Models;

namespace Ujin.Storage.Dao
{
    public class UserDao : IUserDao
    {
        private readonly UjinContext _dbContext;

        private readonly IMapper _mapper;

        public UserDao(UjinContext context, IMapper mapper)
        {
            _dbContext = context;
            _mapper = mapper;
        }

        public async Task<int> AddUser(UserDto user)
        {
            user.Id = -1;
            var userEntity = _mapper.Map<User>(user);
            await _dbContext.UpsertEntities(new[] { userEntity });
            return userEntity.Id;
        }

        public async Task<UserDto> GetByEmail(string email)
        {
            email = email.ToLower();
            var user = await _dbContext.Users.SingleOrDefaultAsync(u => u.Email == email);
            return user != null ? _mapper.Map<UserDto>(user) : null;
        }

        public Task<List<UserDto>> LoadUsers()
        {
            return _dbContext.Users
                .Select(u => _mapper.Map<UserDto>(u))
                .ToListAsync();
        }
    }
}
