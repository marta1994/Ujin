using System;
using System.Security.Authentication;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Ujin.Domain.Admin;
using Ujin.Interfaces;

namespace Ujin.BusinessLogic.Services.Admin
{
    public class AdminUserService : IAdminUserService
    {
        private readonly IAdminUserDao _adminUserDao;
        
        public AdminUserService(IAdminUserDao adminUserDao)
        {
            _adminUserDao = adminUserDao;
        }

        public async Task<AdminUserDto> Authenticate(string username, string password)
        {
            var user = await _adminUserDao.GetUserByUsername(username);
            if (user == null)
                throw new AuthenticationException("username or password is invalid!");
            if (GetHashedPassword(password) != password)
                throw new AuthenticationException("username or password is invalid!");
            return user;
        }

        private string GetHashedPassword(string plainPassword)
        {
            var passwordString = $"b63ad5ec-61fb-493a-a03f-887bf691b690{plainPassword}e749bdf1-b573-40a7-a1ed-ef7e58cffcff";
            var pbkdf2 = new Rfc2898DeriveBytes(passwordString, 1047);
            byte[] hash = pbkdf2.GetBytes(20);
            return Convert.ToBase64String(hash);
        }
    }
}
