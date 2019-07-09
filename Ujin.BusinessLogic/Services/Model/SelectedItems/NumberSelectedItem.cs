using System;
using Ujin.Domain.Dtos;
using Ujin.Domain.Dtos.ModelConfig.Parsed;
using Ujin.Domain.Enums;

namespace Ujin.BusinessLogic.Services.Model.SelectedItems
{
    internal class NumberSelectedItem : BaseSelectedItem<double, NumberOptions>
    {
        public NumberSelectedItem(string value, NumberOptions options) : base(value, options)
        {
        }

        protected override double ParseValue(string val)
        {
            if (!double.TryParse(val, out var dblVal))
                throw new InvalidOperationException($"Cannot convert '{val}' to double!");
            if (dblVal > _options.Max) throw new ApplicationException($"Value '{val}' cannot be greater then max '{_options.Max}'!");
            if (dblVal < _options.Min) throw new ApplicationException($"Value '{val}' cannot be less then min '{_options.Min}'!");
            return dblVal;
        }

        public override string SkuValue => _value.ToString();

        public override ModelInfoNode Info => new ModelInfoNode
        {
            Value = _value.ToString(),
            SuffixKey = string.Empty
        };

        public override JewelryModelConfigType ConfigType => JewelryModelConfigType.Number;

        public override string GetStrValueByPath(string path)
        {
            if (path != null && path.ToLower() == "value") return _value.ToString();
            throw new InvalidOperationException($"Can not get value from path '{path}'!");
        }
    }
}
