using System.Collections.Generic;

namespace Ujin.Controllers.Models.Widget
{
    public class MenuItem
    {
        public int Id { get; set; }

        public string NameKey { get; set; }

        public List<MenuItem> SubItems { get; set; }
    }
}
