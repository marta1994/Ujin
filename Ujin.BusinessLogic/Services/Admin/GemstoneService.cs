using System.Collections.Generic;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Interfaces;

namespace Ujin.BusinessLogic.Services.Admin
{
    public class GemstoneService: IGemstoneService
    {
        private readonly IGemSourceDao _gemSourceDao;

        public GemstoneService(IGemSourceDao gemSourceDao)
        {
            _gemSourceDao = gemSourceDao;
        }

        public Task<List<GemSourceDto>> LoadGemSources()
        {
            return _gemSourceDao.LoadGemSources();
        }

        public Task SaveGemSources(List<GemSourceDto> gemSources)
        {
            return _gemSourceDao.SaveGemSources(gemSources);
        }
    }
}
