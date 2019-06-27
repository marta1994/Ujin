using AutoMapper;
using Ujin.Domain.Dtos.ModelConfig.Parsed;
using Ujin.Web.Server.Models.Jewelry;

namespace Ujin.Web
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ParsedJewelryModel, JewelryModel>();
            CreateMap<ParsedModelConfig, Configuration>();
        }
    }
}
