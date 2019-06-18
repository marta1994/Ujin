using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ujin.Domain;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Domain.Dtos.ModelConfig.Parsed;
using Ujin.Domain.Enums;
using Ujin.Interfaces.Dao;

namespace Ujin.BusinessLogic.Services.Model
{
    public class ModelParser
    {
        private readonly IJewelryModelDao _jewelryModelDao;

        private readonly IMetalDao _metalDao;

        private readonly IGemstoneDao _gemstoneDao;

        private readonly AppSettings _appSettings;

        public ModelParser(
            IJewelryModelDao jewelryModelDao,
            IMetalDao metalDao,
            IGemstoneDao gemstoneDao,
            AppSettings appSettings)
        {
            _jewelryModelDao = jewelryModelDao;
            _metalDao = metalDao;
            _gemstoneDao = gemstoneDao;
            _appSettings = appSettings;
        }

        public async Task<ConfiguredModel> ParseFromSku(string sku)
        {
            var splitted = sku.Split(_appSettings.ExpressionTerms.SkuSeparator);
            if (splitted.Length == 0)
                throw new InvalidOperationException($"Can not parse sku '{sku}'!");
            var modelIdentifier = splitted[0];
            var model = await _jewelryModelDao.LoadJewelryModelByIdentifier(modelIdentifier);
            if (model == null)
                throw new ApplicationException($"Could not find active model with identifier '{modelIdentifier}'!");
            return new ConfiguredModel(
                model,
                splitted.Skip(1).ToList(),
                await GetModelMetals(model),
                await GetModelGemstones(model),
                _appSettings.ExpressionTerms);
        }

        private async Task<List<MetalDto>> GetModelMetals(ParsedJewelryModel model)
        {
            var metalConfigs = model.Configurations
                .Where(c => c.ConfigurationType == JewelryModelConfigType.Options)
                .Select(c => c.ConfigOptions)
                .Cast<SelectorOptions>()
                .Where(s => s.OptionsSource == OptionsSource.Metal)
                .ToList();
            if (metalConfigs.Count == 0) return null;
            var allIds = metalConfigs.SelectMany(m => m.ExternalSourceIds).Distinct().ToList();
            return await _metalDao.LoadMetaldByIds(allIds);
        }

        private async Task<List<GemstoneDto>> GetModelGemstones(ParsedJewelryModel model)
        {
            var gemConfigs = model.Configurations
                .Where(c => c.ConfigurationType == JewelryModelConfigType.Options)
                .Select(c => c.ConfigOptions)
                .Cast<SelectorOptions>()
                .Where(s => s.OptionsSource == OptionsSource.Gemstone)
                .ToList();
            if (gemConfigs.Count == 0) return null;
            var allIds = gemConfigs.SelectMany(m => m.ExternalSourceIds).Distinct().ToList();
            return await _gemstoneDao.LoadGemstonesByIds(allIds);
        }
    }
}
