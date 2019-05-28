using AutoMapper;
using Ujin.Domain.Admin;
using Ujin.Domain.ModelConfig;
using Ujin.Storage.Models;
using Ujin.Storage.Models.ModelConfig;

namespace Ujin.Storage.AutoMapperProfiles
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<AdminUser, AdminUserDto>();
            CreateMap<AdminUserDto, AdminUser>();
            CreateMap<GemstoneSource, GemSourceDto>();
            CreateMap<GemSourceDto, GemstoneSource>();
        }
    }
}
