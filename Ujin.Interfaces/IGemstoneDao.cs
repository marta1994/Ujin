using System.Collections.Generic;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig;

namespace Ujin.Interfaces
{
    public interface IGemstoneDao
    {
        Task<List<GemSourceDto>> LoadGemSources();

        Task<List<GemClassDto>> LoadGemClasses();

        Task<List<GemCutDto>> LoadGemCuts();

        Task<List<GemstoneDto>> LoadGemstones();

        Task SaveGemSources(List<GemSourceDto> gemSources);

        Task SaveGemClasses(List<GemClassDto> gemClasses);

        Task SaveGemCuts(List<GemCutDto> gemCuts);

        Task SaveGemstones(List<GemstoneDto> gemstones);
    }
}
