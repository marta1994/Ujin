using System.Collections.Generic;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig;

namespace Ujin.Interfaces
{
    public interface IJewelryModelDao
    {
        Task<List<JewelryModelDto>> LoadJewelryModels();

        Task<JewelryModelDto> LoadJewelryModelById(int id);

        Task SaveJewelryModel(JewelryModelDto jewelryModel);
    }
}
