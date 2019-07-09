using System.Collections.Generic;

namespace Ujin.Domain.Dtos
{
    public class ModelInfo
    {
        public decimal Price { get; set; }

        public decimal Weight { get; set; }

        public List<ModelInfoNode> Nodes { get; set; }
    }

    public class ModelInfoNode
    {
        public string NameKey { get; set; }

        public string Value { get; set; }

        public bool NeedTranslateValue { get; set; }

        public string SuffixKey { get; set; }

        public List<ModelInfoNode> Children { get; set; }
    }
}
