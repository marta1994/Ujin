using System.Collections.Generic;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig;

namespace Ujin.Interfaces.Dao
{
    public interface IMetalDao
    {
        Task<List<MetalDto>> LoadMetals();

        Task<List<MetalDto>> LoadMetaldByIds(List<int> ids);

        Task SaveMetals(List<MetalDto> metals);
    }
}
