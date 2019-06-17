using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Authentication;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.Admin;
using Ujin.Interfaces;
using Ujin.Interfaces.Dao;

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
            if (GetHashedPassword(password) != user.Password)
                throw new AuthenticationException("username or password is invalid!");

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("b63ad5ec-61fb-493a-a03f-887bf691b690");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // remove password before returning
            user.Password = null;

            return user;
        }

        private string GetHashedPassword(string plainPassword)
        {
            var passwordString = $"b63ad5ec-61fb-493a-a03f-887bf691b690{plainPassword}e749bdf1-b573-40a7-a1ed-ef7e58cffcff";
            const string chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            byte[] bytes = Encoding.UTF8.GetBytes(passwordString);

            SHA256Managed hashstring = new SHA256Managed();
            byte[] hash = hashstring.ComputeHash(bytes);

            char[] hash2 = new char[16];

            for (int i = 0; i < hash2.Length; i++)
            {
                hash2[i] = chars[hash[i] % chars.Length];
            }

            return new string(hash2);
        }
    }
}
