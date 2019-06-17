using Newtonsoft.Json.Linq;

namespace Ujin.Domain.Dtos.ModelConfig.Parsed
{
    public class NumberOptions : BaseConfigOptions
    {
        public NumberOptions(string options) : base(options)
        { }

        protected override void Init(string options)
        {
            dynamic optionsObj = JObject.Parse(options);
            Min = optionsObj.min;
            Max = optionsObj.max;
            Step = optionsObj.step;
        }

        public double Min { get; private set; }

        public double Max { get; private set; }

        public double Step { get; private set; }
    }
}
