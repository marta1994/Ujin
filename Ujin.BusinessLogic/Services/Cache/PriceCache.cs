using System.Threading.Tasks;
using Ujin.Interfaces;
using Ujin.Interfaces.Cache;

namespace Ujin.BusinessLogic.Services.Cache
{
    public class PriceCache: IPriceCache
    {
        private const string ModelPriceFormat = "model.price.{0}";

        private readonly ICache _cache;

        private readonly IPriceCalculatorService _priceCalculator;

        public PriceCache(
            ICache cache,
            IPriceCalculatorService priceCalculator)
        {
            _cache = cache;
            _priceCalculator = priceCalculator;
        }

        public Task<decimal> GetPriceBySku(string sku)
        {
            var key = string.Format(ModelPriceFormat, sku);
            return _cache.GetValue(key, () => _priceCalculator.CalculatePrice(sku));
        }
    }
}
