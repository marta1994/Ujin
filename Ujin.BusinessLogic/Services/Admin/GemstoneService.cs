using System;
using System.Collections.Generic;
using System.Linq;
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

        public Task<List<GemstoneDto>> LoadGemstones()
        {
            return _gemSourceDao.LoadGemstones();
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

        public Task SaveGemstones(List<GemstoneDto> gemstones)
        {
            var isWeightIncorrect = gemstones.Any(g => g.Weight.HasValue && g.Weight <= 0);
            if (isWeightIncorrect)
                throw new ApplicationException(
                    "Incorrect value for property 'Weight': it should be null or greater than 0.");
            var isPriceIncorrect = gemstones.Any(g => g.Price < 0);
            if (isPriceIncorrect)
                throw new ApplicationException(
                    "Incorrect value for property 'Price': it should be greater than 0.");
            var isWidthIncorrect = gemstones.Any(g => g.WidthMm < 0);
            if (isWidthIncorrect)
                throw new ApplicationException(
                    "Incorrect value for property 'WidthMm': it should be greater than 0.");
            var isHeightIncorrect = gemstones.Any(g => g.HeightMm < 0);
            if (isHeightIncorrect)
                throw new ApplicationException(
                    "Incorrect value for property 'HeightMm': it should be greater than 0.");

            return _gemSourceDao.SaveGemstones(gemstones);
        }
    }
}
