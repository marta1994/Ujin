using System.Threading.Tasks;

namespace Ujin.Interfaces
{
    public interface IPriceCalculatorService
    {
        Task<decimal> CalculatePrice(string sku);
    }
}
