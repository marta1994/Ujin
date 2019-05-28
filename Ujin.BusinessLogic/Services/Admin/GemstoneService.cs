using System.Collections.Generic;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Interfaces;

namespace Ujin.BusinessLogic.Services.Admin
{
    public class GemstoneService: IGemstoneService
    {
        private readonly IGemstoneDao _gemSourceDao;

        public GemstoneService(IGemstoneDao gemSourceDao)
        {
            _gemSourceDao = gemSourceDao;
        }

        public Task<List<GemSourceDto>> LoadGemSources()
        {
            return _gemSourceDao.LoadGemSources();
        }

        public Task<List<GemClassDto>> LoadGemClasses()
        {
            return _gemSourceDao.LoadGemClasses();
        }

        public Task<List<GemCutDto>> LoadGemCuts()
        {
            return _gemSourceDao.LoadGemCuts();
        }

        public Task SaveGemSources(List<GemSourceDto> gemSources)
        {
            return _gemSourceDao.SaveGemSources(gemSources);
        }

        public Task SaveGemClasses(List<GemClassDto> gemClasses)
        {
            return _gemSourceDao.SaveGemClasses(gemClasses);
        }

        public Task SaveGemCuts(List<GemCutDto> gemCuts)
        {
            return _gemSourceDao.SaveGemCuts(gemCuts);
        }
    }
}
