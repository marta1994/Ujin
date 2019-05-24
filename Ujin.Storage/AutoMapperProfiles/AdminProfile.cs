using AutoMapper;
using Ujin.Domain.Admin;
using Ujin.Storage.Models;

namespace Ujin.Storage.AutoMapperProfiles
{
    public class AdminProfile: Profile
    {
        public AdminProfile()
        {
            CreateMap<AdminUser, AdminUserDto>();
        }
    }
}
