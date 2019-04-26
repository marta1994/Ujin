using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Ujin.Interfaces;

namespace Ujin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IUserAgentHelper uaHelper;

        private readonly string rootPath;

        public ImageController(IUserAgentHelper uaHelper, IHostingEnvironment environment)
        {
            this.uaHelper = uaHelper;
            rootPath = environment.ContentRootPath;
        }

        [HttpGet("[action]")]
        public IActionResult WidgetImage([FromQuery]string folderName, [FromQuery]string fileName)
        {
            var browser = uaHelper.GetBrowserName(HttpContext);
            switch (browser.ToLower())
            {
                case "chrome":
                case "opera":
                case "firefox":
                    return GetImage(folderName, fileName, "webp", "webp", "image/webp");
                default:
                    return GetImage(folderName, fileName, "png", "png", "image/png");
            }
        }

        private IActionResult GetImage(string folderName, string fileName, string subFolderName, string fileExtension, string type)
        {
            var path =  $"{rootPath}/ClientApp/src/assets/images/widget-rings/{folderName}/{subFolderName}/{fileName}.{fileExtension}";
            var image = System.IO.File.OpenRead(path);
            return File(image, type);
        }
    }
}