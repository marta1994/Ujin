using System.Collections.Generic;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Interfaces;

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
            return _metalDao.SaveMetals(metals);
        }
    }
}
