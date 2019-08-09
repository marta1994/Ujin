using System;
using System.Collections.Generic;
using System.Text;

namespace Ujin.Domain.Dtos
{
    public class SitemapModel
    {
        public string Identifier { get; set; }

        public List<string> Skus { get; set; }
        
        public DateTime LastModified { get; set; }
    }
}
