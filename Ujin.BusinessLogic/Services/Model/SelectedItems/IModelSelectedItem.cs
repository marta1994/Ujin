using Ujin.Domain.Enums;

namespace Ujin.BusinessLogic.Services.Model.SelectedItems
{
    public interface IModelSelectedItem
    {
        object Value { get; }

        string GetStrValueByPath(string path);

        JewelryModelConfigType ConfigType { get; }
    }
}
