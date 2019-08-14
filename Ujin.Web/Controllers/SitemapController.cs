using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Ujin.Domain;
using Ujin.Interfaces;

namespace Ujin.Web.Controllers
{
    [ApiController]
    public class SitemapController : ControllerBase
    {
        private readonly IJewelryModelService _jewelryModelService;

        private readonly AppSettings _appSettings;

        public SitemapController(
            IJewelryModelService jewelryModelService,
            AppSettings appSettings)
        {
            _jewelryModelService = jewelryModelService;
            _appSettings = appSettings;
        }

        [HttpGet]
        [Route("sitemap.xml")]
        public async Task<IActionResult> Index()
        {
            var pagesPath = $"https://{_appSettings.Host}/ua/model/";
            var models = await _jewelryModelService.LoadSitemapModels();
            var urls = string.Join("\r\n", models.Select(m =>
            {
                return string.Join("\r\n", m.Skus.Select(s =>
                {
                    return $@"
    <url>
        <loc>{pagesPath}{m.Identifier}?sku={s}</loc>
        <lastmod>{ m.LastModified.ToString("yyyy-MM-dd")}</lastmod>
    </url>";
                }));
            }));
            return Content($@"<?xml version=""1.0"" encoding=""UTF-8""?>
                 <urlset xmlns=""http://www.sitemaps.org/schemas/sitemap/0.9"">
                    <url>
                        <loc>https://{_appSettings.Host}/ua/catalog</loc>
                        <lastmod>{ DateTime.Now.ToString("yyyy-MM-dd")}</lastmod>
                    </url>
                    {urls}
                    </urlset>", "text/xml");
        }
    }
}