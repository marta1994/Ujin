using System.Collections.Generic;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Interfaces;

namespace Ujin.BusinessLogic.Services.Admin
{
    public class JewelryModelService : IJewelryModelService
    {
        private readonly IJewelryModelDao _jewelryModelDao;

        public JewelryModelService(IJewelryModelDao jewelryModelDao)
        {
            _jewelryModelDao = jewelryModelDao;
        }

        public Task<JewelryModelDto> LoadJewelryModelById(int id)
        {
            return _jewelryModelDao.LoadJewelryModelById(id);
        }

        public Task<List<JewelryModelDto>> LoadJewelryModels()
        {
            return _jewelryModelDao.LoadJewelryModels();
        }

        public Task SaveJewelryModel(JewelryModelDto jewelryModel)
        {
            return _jewelryModelDao.SaveJewelryModel(jewelryModel);
        }
    }
}
