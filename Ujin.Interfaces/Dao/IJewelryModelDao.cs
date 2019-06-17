using System.Collections.Generic;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Domain.Dtos.ModelConfig.Parsed;

namespace Ujin.Interfaces.Dao
{
    public interface IJewelryModelDao
    {
        Task<List<JewelryModelDto>> LoadJewelryModels();

        Task<JewelryModelDto> LoadJewelryModelById(int id);

        Task<ParsedJewelryModel> LoadJewelryModelByIdentifier(string identifier);

        Task SaveJewelryModel(JewelryModelDto jewelryModel);

        Task SetEnabledState(int modelId, bool enabled);
    }
}
