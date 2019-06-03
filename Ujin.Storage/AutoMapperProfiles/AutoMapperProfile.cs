using AutoMapper;
using Ujin.Domain.Dtos.Admin;
using Ujin.Domain.Dtos.ModelConfig;
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
            CreateMap<GemstoneClass, GemClassDto>();
            CreateMap<GemClassDto, GemstoneClass>();
            CreateMap<GemstoneCut, GemCutDto>();
            CreateMap<GemCutDto, GemstoneCut>();
            CreateMap<Color, ColorDto>();
            CreateMap<ColorDto, Color>();
            CreateMap<Gemstone, GemstoneDto>();
            CreateMap<GemstoneDto, Gemstone>();
            CreateMap<MetalDto, Metal>();
            CreateMap<Metal, MetalDto>();
            CreateMap<JewelryModel, JewelryModelDto>();
            CreateMap<JewelryModelDto, JewelryModel>();
            CreateMap<ModelConfiguration, ModelConfigurationDto>();
            CreateMap<ModelConfigurationDto, ModelConfiguration>();
        }
    }
}
