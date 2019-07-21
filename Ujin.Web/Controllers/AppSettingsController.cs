using Microsoft.AspNetCore.Mvc;
using Ujin.Domain;
using Ujin.Web.Models;

namespace Ujin.Web.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppSettingsController: ControllerBase
    {
        private readonly AppSettings _appSettings;

        public AppSettingsController(AppSettings appSettings)
        {
            _appSettings = appSettings;
        }

        [HttpGet("[action]")]
        public ExpressionTerms Terms()
        {
            return _appSettings.ExpressionTerms;
        }

        [HttpGet("[action]")]
        public SocialRefs SocialReferences()
        {
            return new SocialRefs
            {
                Facebook = _appSettings.SocialReferences.Facebook,
                Instagram = _appSettings.SocialReferences.Instagram,
                Pinterest = _appSettings.SocialReferences.Pinterest,
                FacebookAppId = _appSettings.SocialReferences.FacebookAppId,
                SelfHost = "https://" + _appSettings.Host + "/",
                Phones = _appSettings.Contacts.Phones,
                Email = _appSettings.Contacts.Email,
                DiscountHref = _appSettings.Contacts.DiscountHref
            };
        }
    }
}
