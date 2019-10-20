using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ujin.BusinessLogic.Services.Model;
using Ujin.Domain.Dtos;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Domain.Dtos.ModelConfig.Parsed;
using Ujin.Domain.Enums;
using Ujin.Interfaces;
using Ujin.Interfaces.Cache;
using Ujin.Interfaces.Dao;

namespace Ujin.BusinessLogic.Services
{
    public class JewelryModelService : IJewelryModelService
    {
        private readonly IJewelryModelDao _jewelryModelDao;

        private readonly IParsedModelCache _parsedModelCache;

        private readonly IModelInfoCache _modelInfoCache;

        private readonly ModelParser _modelParser;

        private readonly SiteMapModelService _siteMapModelService;

        public JewelryModelService(
            IJewelryModelDao jewelryModelDao,
            IParsedModelCache parsedModelCache,
            ModelParser modelParser,
            IModelInfoCache modelInfoCache,
            SiteMapModelService siteMapModelService)
        {
            _jewelryModelDao = jewelryModelDao;
            _parsedModelCache = parsedModelCache;
            _modelParser = modelParser;
            _modelInfoCache = modelInfoCache;
            _siteMapModelService = siteMapModelService;
        }

        public async Task<ParsedJewelryModel> GetActiveJewelryModelByIdentifier(string identifier)
        {
            var model = await _parsedModelCache.GetParsedModelById(identifier);
            if (model.ModelState != JewelryModelState.Enabled) return null;
            return model;
        }

        public Task<ModelInfo> GetModelInfo(string sku)
        {
            return _modelInfoCache.GetModelInfoBySku(sku);
        } 

        public async Task<IEnumerable<SitemapModel>> LoadSitemapModels()
        {
            var models = (await _jewelryModelDao.LoadJewelryModels())
                .Where(m => m.ModelState == JewelryModelState.Enabled).ToList();
            return await Task.WhenAll(models.Select(m => _siteMapModelService.GetSitemapModel(m)));
        }

        public async Task<List<string>> GetOrderedValues(string sku, string identifier)
        {
            var confModel = await _modelParser.ParseFromSku(sku);
            if (confModel.Identifier != identifier)
                throw new ApplicationException($"Could not parse sku '{sku}' for model '{identifier}'");
            return confModel.Configs.OrderBy(c => c.Order)
                .Select(c => c.SelectedItem.SkuValue).ToList();
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

            var sameIdentifiers = allModelConfigs.GroupBy(c => c.Identifier).Count() != allModelConfigs.Count;
            if (sameIdentifiers)
                throw new ApplicationException(
                    "Identical identifiers are present in Configuration identifiers. All identifiers should be distinct.");

            await _jewelryModelDao.SaveJewelryModel(jewelryModel);
        }

        public Task SetEnabledState(int modelId, bool enabled)
        {
            return _jewelryModelDao.SetEnabledState(modelId, enabled);
        }
    }
}
