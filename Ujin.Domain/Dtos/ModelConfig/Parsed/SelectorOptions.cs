using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Linq;
using Ujin.Domain.Enums;

namespace Ujin.Domain.Dtos.ModelConfig.Parsed
{
    public class SelectorOptions : BaseConfigOptions
    {
        private class SelectorType
        {
            public OptionsSource optionsSource { get; set; }
            public List<int> externalSourceIds;
            public List<OptionType> customOptions {get; set;}
        }

        private class OptionType
        {
            public string nameKey { get; set; }
            public string identifier { get; set; }
            public int id { get; set; }
            public double value { get; set; }
        }

        public SelectorOptions(string options): base(options)
        { }

        protected override void Init(string options)
        {
            var optionsObj = JsonConvert.DeserializeObject<SelectorType>(options);
            OptionsSource = optionsObj.optionsSource;
            ExternalSourceIds = optionsObj.externalSourceIds.ToList();
            CustomOptions = optionsObj.customOptions.Select(opt => new CustomOption
            {
                Id = opt.id,
                Identifier = opt.identifier,
                NameKey = opt.nameKey,
                Value = opt.value
            }).ToList();
        }

        public OptionsSource OptionsSource { get; private set; }

        public List<int> ExternalSourceIds { get; private set; }

        public List<CustomOption> CustomOptions { get; private set; }
    }
}
