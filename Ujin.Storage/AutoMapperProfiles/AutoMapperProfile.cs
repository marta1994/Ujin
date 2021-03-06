﻿using AutoMapper;
using Ujin.Domain.Dtos;
using Ujin.Domain.Dtos.Admin;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Domain.Dtos.ModelConfig.Parsed;
using Ujin.Domain.Enums;
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

            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
            CreateMap<Order, OrderDto>();
            CreateMap<OrderDto, Order>();
            CreateMap<OrderedProductDto, OrderedProduct>();
            CreateMap<OrderedProduct, OrderedProductDto>();

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
            CreateMap<SkuDescription, SkuDescriptionDto>();
            CreateMap<SkuDescriptionDto, SkuDescription>();
            CreateMap<ModelConfiguration, ModelConfigurationDto>();
            CreateMap<ModelConfigurationDto, ModelConfiguration>();
            CreateMap<JewelryModel, ParsedJewelryModel>();
            CreateMap<ModelConfiguration, ParsedModelConfig>()
                .ForMember(m => m.ConfigOptions, m => m.MapFrom<ParsedModelConfigResolver>());
        }
    }

    internal class ParsedModelConfigResolver : 
        IValueResolver<ModelConfiguration, ParsedModelConfig, BaseConfigOptions>
    {
        public BaseConfigOptions Resolve(
            ModelConfiguration source, 
            ParsedModelConfig destination, 
            BaseConfigOptions member, 
            ResolutionContext context)
        {
            switch (source.ConfigurationType)
            {
                case JewelryModelConfigType.Number:
                    return new NumberOptions(source.ConfigurationOptions);
                case JewelryModelConfigType.Options:
                    return new SelectorOptions(source.ConfigurationOptions);
                default:
                    return null;
            }
        }
    }
}
