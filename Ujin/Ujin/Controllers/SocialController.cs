 using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Ujin.Controllers.Models.Social;

namespace Ujin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SocialController : ControllerBase
    {
        private readonly SocialReferences socialRefs;

        private readonly string host;

        public SocialController(IOptions<AppSettings> appSettingsOptions)
        {
            socialRefs = appSettingsOptions.Value.SocialReferences;
            host = appSettingsOptions.Value.Host;
        }

        [HttpGet("[action]")]
        public SocialRefs SocialReferences()
        {
            return new SocialRefs
            {
                Facebook = socialRefs.Facebook,
                Instagram = socialRefs.Instagram,
                Pinterest = socialRefs.Pinterest,
                FacebookAppId = socialRefs.FacebookAppId,
                SelfHost = "http://" + host + "/"
            };
        }
    }
}