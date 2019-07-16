using Microsoft.AspNetCore.Mvc;
using Ujin.Domain;

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
    }
}
