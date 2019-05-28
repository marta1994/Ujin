using System.Collections.Generic;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig;

namespace Ujin.Interfaces
{
    public interface IGemstoneService
    {
        Task<List<GemSourceDto>> LoadGemSources();

        Task SaveGemSources(List<GemSourceDto> gemSources);
    }
}
