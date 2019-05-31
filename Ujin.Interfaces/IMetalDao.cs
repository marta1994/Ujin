using System.Collections.Generic;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig;

namespace Ujin.Interfaces
{
    public interface IMetalDao
    {
        Task<List<MetalDto>> LoadMetals();

        Task SaveMetals(List<MetalDto> metals);
    }
}
