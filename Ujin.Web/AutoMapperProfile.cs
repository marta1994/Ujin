using AutoMapper;
using Newtonsoft.Json;
using System.Collections.Generic;
using Ujin.Domain.Dtos.ModelConfig.Parsed;
using Ujin.Web.Server.Models.Jewelry;

namespace Ujin.Web
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ParsedJewelryModel, JewelryModel>()
                .ForMember(jm => jm.ImagesCount, m => m.MapFrom(
                    src => JsonConvert.DeserializeObject<List<string>>(src.ImagesPattern).Count));
            CreateMap<ParsedModelConfig, Configuration>();
        }
    }
}
