using System.Collections.Generic;

namespace Ujin.Web.Server.Models.Jewelry
{
    public class JewelryModel
    {
        public string NameKey { get; set; }

        public string Identifier { get; set; }

        public int ImagesCount { get; set; }

        public List<SkuDescription> SkuDescriptions { get; set; }

        public virtual List<Configuration> Configurations { get; set; }
    }
}
