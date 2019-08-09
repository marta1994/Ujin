using System.Collections.Generic;
using System.Threading.Tasks;
using Ujin.Domain.Dtos;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Domain.Dtos.ModelConfig.Parsed;

namespace Ujin.Interfaces
{
    public interface IJewelryModelService
    {
        Task<List<JewelryModelDto>> LoadJewelryModels();

        Task<IEnumerable<SitemapModel>> LoadSitemapModels();

        Task<JewelryModelDto> LoadJewelryModelById(int id);

        Task<ModelInfo> GetModelInfo(string sku);

        Task SaveJewelryModel(JewelryModelDto jewelryModel);

        Task SetEnabledState(int modelId, bool enabled);

        Task<ParsedJewelryModel> GetActiveJewelryModelByIdentifier(string identifier);

        Task<List<string>> GetOrderedValues(string sku, string identifier);
    }
}
