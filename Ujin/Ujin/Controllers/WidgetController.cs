using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Ujin.Controllers.Models.Widget;

namespace Ujin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WidgetController : ControllerBase
    {
        [HttpGet("[action]")]
        public List<MenuItem> GetMenuItems()
        {
            var menuItems = new List<MenuItem>
            {
                new MenuItem
                {
                    NameKey = "widget.metal.capture",
                    SubItems = new List<MenuItem>
                    {
                        new MenuItem { Id = 2, NameKey = "widget.metal.whitegold" },
                        new MenuItem { Id = 1, NameKey = "widget.metal.gold" },
                        new MenuItem { Id = 3, NameKey = "widget.metal.silver" },
                    }
                },
                new MenuItem
                {
                    NameKey = "widget.gemstone.capture",
                    SubItems = new List<MenuItem>
                    {
                        new MenuItem { Id = 1, NameKey = "widget.gemstone.sapphire" },
                        new MenuItem { Id = 2, NameKey = "widget.gemstone.ruby" },
                        new MenuItem { Id = 3, NameKey = "widget.gemstone.amethyst" },
                        new MenuItem { Id = 4, NameKey = "widget.gemstone.emerald" }
                    }
                },
                new MenuItem
                {
                    NameKey = "widget.covering.capture",
                    SubItems = new List<MenuItem>
                    {
                        new MenuItem { Id = 1, NameKey = "widget.covering.feather" },
                        new MenuItem { Id = 2, NameKey = "widget.covering.bubble" },
                        new MenuItem { Id = 3, NameKey = "widget.covering.doodles" },
                        new MenuItem { Id = 4, NameKey = "widget.covering.foil" }
                    }
                },
                new MenuItem
                {
                    NameKey = "widget.size.capture"
                }
            };

            return menuItems;
        }
    }
}