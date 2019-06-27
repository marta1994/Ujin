using System.Threading.Tasks;

namespace Ujin.Interfaces.Cache
{
    public interface IPriceCache
    {
        Task<decimal> GetPriceBySku(string sku);
    }
}
