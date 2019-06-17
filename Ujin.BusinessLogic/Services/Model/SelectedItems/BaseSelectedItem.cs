using Ujin.Domain.Dtos.ModelConfig.Parsed;
using Ujin.Domain.Enums;

namespace Ujin.BusinessLogic.Services.Model.SelectedItems
{
    internal abstract class BaseSelectedItem<T, U>: IModelSelectedItem where U : BaseConfigOptions
    {
        protected T _value;

        protected U _options;

        protected BaseSelectedItem() { }

        protected BaseSelectedItem(string value, U options)
        {
            _options = options;
            _value = ParseValue(value);
        }

        protected abstract T ParseValue(string val);

        public object Value
        {
            get
            {
                return _value;
            }
        }

        public abstract JewelryModelConfigType ConfigType { get; }

        public abstract string GetStrValueByPath(string path);
    }
}
