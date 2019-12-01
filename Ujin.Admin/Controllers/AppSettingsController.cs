using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ujin.Domain;

namespace Ujin.Admin.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AppSettingsController : ControllerBase
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