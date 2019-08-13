using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Domain.Dtos.ModelConfig.Parsed;
using Ujin.Domain.Enums;
using Ujin.Interfaces.Cache;
using Ujin.Interfaces.Dao;

namespace Ujin.BusinessLogic.Services.Cache
{
    public class ParsedModelCache: IParsedModelCache
    {
        private const string ParsedModelFormat = "jewelryModel.{0}";

        private readonly ICache _cache;

        private readonly IJewelryModelDao _jewelryModelDao;

        private readonly IMetalDao _metalDao;

        private readonly IGemstoneDao _gemstoneDao;

        public ParsedModelCache(
            ICache cache,
            IJewelryModelDao jewelryModelDao,
            IMetalDao metalDao,
            IGemstoneDao gemstoneDao)
        {
            _cache = cache;
            _jewelryModelDao = jewelryModelDao;
            _metalDao = metalDao;
            _gemstoneDao = gemstoneDao;
        }

        public Task<ParsedJewelryModel> GetParsedModelById(string identifier)
        {
            var key = string.Format(ParsedModelFormat, identifier);
            return _cache.GetValue(key, async () => {
                identifier = identifier.ToLower();
                var model = await _jewelryModelDao.LoadJewelryModelByIdentifier(identifier);
                await FillActualSelectorOptions(model);
                return model;
            });
        }

        private async Task FillActualSelectorOptions(ParsedJewelryModel model)
        {
            var metals = (await GetModelMetals(model)).ToDictionary(m => m.Id);
            var gemstones = (await GetModelGemstones(model)).ToDictionary(g => g.Id);
            foreach (var config in model.Configurations
                .Where(c => c.ConfigurationType == JewelryModelConfigType.Options)
                .Select(c => c.ConfigOptions).Cast<SelectorOptions>())
            {
                switch(config.OptionsSource)
                {
                    case OptionsSource.Gemstone:
                        config.GemstoneSource = config.ExternalSourceIds.Select(id => gemstones[id]).ToList();
                        break;
                    case OptionsSource.Metal:
                        config.MetalSource = config.ExternalSourceIds.Select(id => metals[id]).ToList();
                        break;
                }
            }
        }

        private Task<List<MetalDto>> GetModelMetals(ParsedJewelryModel model)
        {
            var metalConfigs = model.Configurations
                .Where(c => c.ConfigurationType == JewelryModelConfigType.Options)
                .Select(c => c.ConfigOptions)
                .Cast<SelectorOptions>()
                .Where(s => s.OptionsSource == OptionsSource.Metal)
                .ToList();
            if (metalConfigs.Count == 0) return null;
            var allIds = metalConfigs.SelectMany(m => m.ExternalSourceIds).Distinct().ToList();
            return _metalDao.LoadMetaldByIds(allIds);
        }

        private Task<List<GemstoneDto>> GetModelGemstones(ParsedJewelryModel model)
        {
            var gemConfigs = model.Configurations
                .Where(c => c.ConfigurationType == JewelryModelConfigType.Options)
                .Select(c => c.ConfigOptions)
                .Cast<SelectorOptions>()
                .Where(s => s.OptionsSource == OptionsSource.Gemstone)
                .ToList();
            if (gemConfigs.Count == 0) return null;
            var allIds = gemConfigs.SelectMany(m => m.ExternalSourceIds).Distinct().ToList();
            return _gemstoneDao.LoadGemstonesByIds(allIds);
        }
    }
}
