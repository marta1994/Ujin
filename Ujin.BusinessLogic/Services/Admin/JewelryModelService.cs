using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task SaveJewelryModel(JewelryModelDto jewelryModel)
        {
            var isPriceIncorrect = jewelryModel.BasePrice < 0;
            if (isPriceIncorrect)
                throw new ApplicationException(
                    "Incorrect value for property 'BasePrice': it should be greater than 0.");

            var allModelConfigs = jewelryModel.Configurations.ToList();
            if (jewelryModel.Id > 0)
            {
                var dbModel = await _jewelryModelDao.LoadJewelryModelById(jewelryModel.Id);
                var dbConfigs = dbModel.Configurations.Where(c => allModelConfigs.All(ac => ac.Id != c.Id));
                allModelConfigs.AddRange(dbConfigs);
            }

            var sameNames = allModelConfigs.GroupBy(c => c.NameKey).Count() != allModelConfigs.Count;
            if (sameNames)
                throw new ApplicationException(
                    "Identical names are present in Configuration names. All names should be distinct.");

            await _jewelryModelDao.SaveJewelryModel(jewelryModel);
        }

        public Task SetEnabledState(int modelId, bool enabled)
        {
            return _jewelryModelDao.SetEnabledState(modelId, enabled);
        }
    }
}
