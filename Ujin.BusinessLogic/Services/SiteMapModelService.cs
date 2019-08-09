using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ujin.Domain;
using Ujin.Domain.Dtos;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Domain.Dtos.ModelConfig.Parsed;
using Ujin.Domain.Enums;
using Ujin.Interfaces.Cache;

namespace Ujin.BusinessLogic.Services
{
    public class SiteMapModelService
    {
        private readonly IParsedModelCache _parsedModelCache;

        private readonly AppSettings _appSettings;

        public SiteMapModelService(
            IParsedModelCache parsedModelCache,
            AppSettings appSettings)
        {
            _parsedModelCache = parsedModelCache;
            _appSettings = appSettings;
        }

        public async Task<SitemapModel> GetSitemapModel(JewelryModelDto jewelryModel)
        {
            var parsed = await _parsedModelCache.GetParsedModelById(jewelryModel.Identifier);
            var skus = LoadAllSitemapSkus(new List<string> { parsed.Identifier },
                new Stack<ParsedModelConfig>(parsed.Configurations.OrderBy(c => -c.Order)));
            return new SitemapModel
            {
                Identifier = parsed.Identifier,
                Skus = skus,
                LastModified = jewelryModel.DateModified.HasValue ? jewelryModel.DateModified.Value : jewelryModel.DateCreated
            };
        }

        private List<string> LoadAllSitemapSkus(List<string> currentValue, Stack<ParsedModelConfig> configs)
        {
            if (configs.Count == 0) return currentValue;
            var config = configs.Pop();
            var resultList = ProcessConfig(config, currentValue);
            return LoadAllSitemapSkus(resultList, configs);
        }

        private List<string> ProcessConfig(ParsedModelConfig config, List<string> currentValue)
        {
            switch (config.ConfigurationType)
            {
                case JewelryModelConfigType.Options:
                    var options = ((SelectorOptions)config.ConfigOptions).AllValues;
                    return CombineValues(currentValue, options);

                case JewelryModelConfigType.Number:
                    var option = ((NumberOptions)config.ConfigOptions).Min.ToString(CultureInfo.InvariantCulture);
                    return CombineValues(currentValue, new List<string> { option });

                default:
                    throw new ApplicationException($"Configuration type {config.ConfigurationType} is not supported!");
            }
        }

        private List<string> CombineValues(List<string> currentValue, List<string> options)
        {
            var result = new List<string>();
            foreach (var val in currentValue)
            {
                foreach (var opt in options)
                    result.Add(val + _appSettings.ExpressionTerms.SkuSeparator + opt);
            }
            return result;
        }
    }
}
