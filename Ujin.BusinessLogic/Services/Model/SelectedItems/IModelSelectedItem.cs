using Ujin.Domain.Dtos;
using Ujin.Domain.Enums;

namespace Ujin.BusinessLogic.Services.Model.SelectedItems
{
    public interface IModelSelectedItem
    {
        object Value { get; }

        string GetStrValueByPath(string path);

        string SkuValue { get; }

        JewelryModelConfigType ConfigType { get; }

        ModelInfoNode Info { get; }
    }
}
