using System.Collections.Generic;
using System.Threading.Tasks;
using Ujin.Domain.ModelConfig;

namespace Ujin.Interfaces
{
    public interface IGemstoneService
    {
        Task<List<GemSourceDto>> LoadGemSources();

        Task SaveGemSources(List<GemSourceDto> gemSources);
    }
}
