using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ujin.Domain;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Domain.Dtos.ModelConfig.Parsed;
using Ujin.Domain.Enums;
using Ujin.Interfaces.Cache;
using Ujin.Interfaces.Dao;

namespace Ujin.BusinessLogic.Services.Model
{
    public class ModelParser
    {
        private readonly IMetalDao _metalDao;

        private readonly IGemstoneDao _gemstoneDao;

        private readonly AppSettings _appSettings;

        private readonly IParsedModelCache _parsedModelCache;

        public ModelParser(
            IJewelryModelDao jewelryModelDao,
            IMetalDao metalDao,
            IGemstoneDao gemstoneDao,
            AppSettings appSettings,
            IParsedModelCache parsedModelCache)
        {
            _metalDao = metalDao;
            _gemstoneDao = gemstoneDao;
            _appSettings = appSettings;
            _parsedModelCache = parsedModelCache;
        }

        public async Task<ConfiguredModel> ParseFromSku(string sku)
        {
            var splitted = sku.Split(_appSettings.ExpressionTerms.SkuSeparator);

            if (splitted.Length == 0)
                throw new InvalidOperationException($"Can not parse sku '{sku}'!");
            var modelIdentifier = splitted[0];
            var model = await _parsedModelCache.GetParsedModelById(modelIdentifier);
            if (model == null)
                throw new ApplicationException($"Could not find active model with identifier '{modelIdentifier}'!");

            return new ConfiguredModel(
                model,
                splitted.Skip(1).ToList(),
                _appSettings.ExpressionTerms);
        }
    }
}
