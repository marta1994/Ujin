using System;
using System.Linq;
using System.Threading.Tasks;
using Ujin.BusinessLogic.Services.Model;
using Ujin.Domain.Dtos;
using Ujin.Interfaces;
using Ujin.Interfaces.Cache;

namespace Ujin.BusinessLogic.Services.Cache
{
    public class ModelInfoCache : IModelInfoCache
    {
        private const string ModelInfoFormat = "model.info.{0}";

        private readonly ICache _cache;

        private readonly ExpressionCalculatorService _expressionCalculatorService;

        private readonly ModelParser _modelParser;

        public ModelInfoCache(
            ICache cache,
            ExpressionCalculatorService expressionCalculatorService,
            ModelParser modelParser)
        {
            _cache = cache;
            _expressionCalculatorService = expressionCalculatorService;
            _modelParser = modelParser;
        }

        public Task<ModelInfo> GetModelInfoBySku(string sku)
        {
            var key = string.Format(ModelInfoFormat, sku);
            return _cache.GetValue(key, async () =>
            {
                var model = await _modelParser.ParseFromSku(sku);
                var modelInfo = new ModelInfo
                {
                    Price = await _expressionCalculatorService.CalculateExpression(model.PriceExpression, model),
                    Weight = await _expressionCalculatorService.CalculateExpression(model.WeightExpression, model),
                    Nodes = model.Configs.Select(c => {
                        var node = c.SelectedItem.Info;
                        node.NameKey = c.NameKey;
                        return node;
                    }).ToList()
                };
                modelInfo.Weight = Math.Floor(modelInfo.Weight * 100) / 100;
                return modelInfo;
            });
        }
    }
}
