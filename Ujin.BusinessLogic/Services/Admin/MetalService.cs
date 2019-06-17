using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Interfaces;
using Ujin.Interfaces.Dao;

namespace Ujin.BusinessLogic.Services.Admin
{
    public class MetalService : IMetalService
    {
        private readonly IMetalDao _metalDao;

        public MetalService(IMetalDao metalDao)
        {
            _metalDao = metalDao;
        }

        public Task<List<MetalDto>> LoadMetals()
        {
            return _metalDao.LoadMetals();
        }

        public Task SaveMetals(List<MetalDto> metals)
        {
            var isPriceIncorrect = metals.Any(g => g.PricePerGram < 0);
            if (isPriceIncorrect)
                throw new ApplicationException(
                    "Incorrect value for property 'PricePerGram': it should be greater than 0.");

            return _metalDao.SaveMetals(metals);
        }
    }
}
