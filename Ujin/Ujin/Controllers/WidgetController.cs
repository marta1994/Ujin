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
                        new MenuItem { NameKey = "widget.metal.whitegold" },
                        new MenuItem { NameKey = "widget.metal.gold" },
                        new MenuItem { NameKey = "widget.metal.silver" },
                    }
                },
                new MenuItem
                {
                    NameKey = "widget.gemstone.capture",
                    SubItems = new List<MenuItem>
                    {
                        new MenuItem { NameKey = "widget.gemstone.sapphire" },
                        new MenuItem { NameKey = "widget.gemstone.ruby" },
                        new MenuItem { NameKey = "widget.gemstone.amethyst" },
                        new MenuItem { NameKey = "widget.gemstone.emerald" }
                    }
                },
                new MenuItem
                {
                    NameKey = "widget.covering.capture",
                    SubItems = new List<MenuItem>
                    {
                        new MenuItem { NameKey = "widget.covering.feather" },
                        new MenuItem { NameKey = "widget.covering.bubble" },
                        new MenuItem { NameKey = "widget.covering.doodles" },
                        new MenuItem { NameKey = "widget.covering.foil" }
                    }
                },
                new MenuItem
                {
                    NameKey = "widget.size.capture"
                }
            };

            for (var i = 0; i < menuItems.Count; ++i)
            {
                menuItems[i].Id = i.ToString();
                if (menuItems[i].SubItems != null)
                {
                    for (var j = 0; j < menuItems[i].SubItems.Count; ++j)
                    {
                        menuItems[i].SubItems[j].Id = menuItems[i].Id + j.ToString();
                    }
                }
            }

            return menuItems;
        }
    }
}