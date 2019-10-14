using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ujin.BusinessLogic.Services.Model;
using Ujin.Domain.Dtos;
using Ujin.Interfaces;
using Ujin.Interfaces.Dao;

namespace Ujin.BusinessLogic.Services
{
    public class SkuDescriptionService : ISkuDescriptionService
    {
        private readonly ISkuDescriptionDao _skuDescriptionDao;

        private readonly ModelParser _modelParser;

        public SkuDescriptionService(
            ISkuDescriptionDao skuDescriptionDao,
            ModelParser modelParser)
        {
            _skuDescriptionDao = skuDescriptionDao;
            _modelParser = modelParser;
        }

        public async Task<List<SkuDescriptionDto>> LoadSkuDescriptionsByModelId(int modelId)
        {
            return (await _skuDescriptionDao.LoadSkuDescriptionsByModelId(modelId)).Where(s => s.IsEnabled).ToList();
        }

        public Task<SkuDescriptionDto> LoadSkuDescription(string sku)
        {
            return _skuDescriptionDao.LoadSkuDescription(sku);
        }

        public Task SaveSkuDescriptions(List<SkuDescriptionDto> skuDescriptions)
        {
            return _skuDescriptionDao.SaveSkuDescriptions(skuDescriptions);
        }

        public async Task UpdateSkuEnabledStateForModel(int modelId)
        {
            var skus = await _skuDescriptionDao.LoadSkuDescriptionsByModelId(modelId);
            var enabledSkus = new List<string>();
            var disabledSkus = new List<string>();
            foreach(var sku in skus)
            {
                try
                {
                    await _modelParser.ParseFromSku(sku.Sku);
                    enabledSkus.Add(sku.Sku);
                }
                catch (ApplicationException)
                {
                    disabledSkus.Add(sku.Sku);
                }
            }
            await _skuDescriptionDao.SetEnabledValue(enabledSkus, true);
            await _skuDescriptionDao.SetEnabledValue(disabledSkus, false);
        }
    }
}
