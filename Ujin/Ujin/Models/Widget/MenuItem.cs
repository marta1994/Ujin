using System.Collections.Generic;

namespace Ujin.Models.Widget
{
    public class MenuItem
    {
        public string Id { get; set; }

        public string NameKey { get; set; }

        public List<MenuItem> SubItems { get; set; }
    }
}
