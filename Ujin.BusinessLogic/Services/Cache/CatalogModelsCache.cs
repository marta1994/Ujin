using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ujin.BusinessLogic.Services.Model;
using Ujin.BusinessLogic.Services.Model.SelectedItems;
using Ujin.Domain.Dtos;
using Ujin.Domain.Enums;
using Ujin.Interfaces.Cache;
using Ujin.Interfaces.Dao;

namespace Ujin.BusinessLogic.Services.Cache
{
    public class CatalogModelsCache : ICatalogModelsCache
    {
        private const string CatalogModelsKey = "catalogItems";

        private const string OrnamentKey = "ornament";

        private readonly ICache _cache;

        private readonly ISkuDescriptionDao _skuDescriptionDao;

        private readonly ModelParser _modelParser;

        private readonly ExpressionCalculatorService _expressionCalculatorService;

        public CatalogModelsCache(
            ICache cache, 
            ISkuDescriptionDao skuDescriptionDao,
            ModelParser modelParser,
            ExpressionCalculatorService expressionCalculatorService)
        {
            _skuDescriptionDao = skuDescriptionDao;
            _modelParser = modelParser;
            _cache = cache;
            _expressionCalculatorService = expressionCalculatorService;
        }

        public async Task<List<CatalogItem>> GetCatalogModels()
        {
            return await _cache.GetValue(CatalogModelsKey, LoadCatalogItems);
        }

        private async Task<List<CatalogItem>> LoadCatalogItems()
        {
            var catalogSkus = await _skuDescriptionDao.LoadCatalogSkus();
            var tasks = catalogSkus.Select(async sku =>
            {
                var model = await _modelParser.ParseFromSku(sku.Sku);
                return new CatalogItem
                {
                    Sku = sku.Sku,
                    ModelIdentifier = model.Identifier,
                    Tags = JsonConvert.DeserializeObject<List<string>>(sku.Tags),
                    ProductLabel = sku.ProductLabel,
                    Price = await _expressionCalculatorService.CalculateExpression(model.PriceExpression, model),
                    ImagePath = JsonConvert.DeserializeObject<List<string>>(sku.Images)?.FirstOrDefault(),
                    DisplayNameParts = GetNameParts(model),
                    DescriptionParts = GetDescriptionParts(model)
                };
            });

            var result = new List<CatalogItem>();
            foreach (var task in tasks)
                result.Add(await task);
            return result;
        }

        private List<string> GetDescriptionParts(ConfiguredModel model)
        {
            var metalConfigs = model.Configs
                .Select(c => c.SelectedItem)
                .OfType<OptionsSelectedItem>()
                .Where(oi => oi.OptionsSource == OptionsSource.Metal)
                .Select(m => m.ValueNameKey);
            var gemConfigs = model.Configs
                .Select(c => c.SelectedItem)
                .OfType<OptionsSelectedItem>()
                .Where(oi => oi.OptionsSource == OptionsSource.Gemstone)
                .Select(m => m.ValueNameKey);
            return metalConfigs.Concat(gemConfigs).ToList();
        }

        private List<string> GetNameParts(ConfiguredModel model)
        {
            var nameParts = new List<string> { model.NameKey };
            var ornamentConfig = model.Configs
                .Where(c => c.Identifier.ToLower().Contains(OrnamentKey))
                .Select(c => c.SelectedItem)
                .OfType<OptionsSelectedItem>()
                .Where(oi => oi.OptionsSource == OptionsSource.Custom)
                .FirstOrDefault();
            if (ornamentConfig != null)
            {
                nameParts.Add(ornamentConfig.ValueNameKey);
            }
            return nameParts;
        }
    }
}
