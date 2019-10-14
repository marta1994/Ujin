using System.Collections.Generic;
using System.Threading.Tasks;
using Ujin.Domain.Dtos;

namespace Ujin.Interfaces.Dao
{
    public interface ISkuDescriptionDao
    {
        Task<List<SkuDescriptionDto>> LoadSkuDescriptionsByModelId(int modelId);

        Task<SkuDescriptionDto> LoadSkuDescription(string sku);

        Task SaveSkuDescriptions(List<SkuDescriptionDto> skuDescriptions);

        Task SetEnabledValue(List<string> skus, bool isEnabled);
    }
}
