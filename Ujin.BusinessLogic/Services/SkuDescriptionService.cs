using System.Collections.Generic;
using System.Threading.Tasks;
using Ujin.Domain.Dtos;
using Ujin.Interfaces;
using Ujin.Interfaces.Dao;

namespace Ujin.BusinessLogic.Services
{
    public class SkuDescriptionService : ISkuDescriptionService
    {
        private readonly ISkuDescriptionDao _skuDescriptionDao;

        public SkuDescriptionService(ISkuDescriptionDao skuDescriptionDao)
        {
            _skuDescriptionDao = skuDescriptionDao;
        }

        public Task<List<SkuDescriptionDto>> LoadSkuDescriptionsByModelId(int modelId)
        {
            return _skuDescriptionDao.LoadSkuDescriptionsByModelId(modelId);
        }

        public Task<SkuDescriptionDto> LoadSkuDescription(string sku)
        {
            return _skuDescriptionDao.LoadSkuDescription(sku);
        }

        public Task SaveSkuDescriptions(List<SkuDescriptionDto> skuDescriptions)
        {
            return _skuDescriptionDao.SaveSkuDescriptions(skuDescriptions);
        }
    }
}
