using System.Threading.Tasks;
using Ujin.Domain.Dtos;

namespace Ujin.Interfaces.Cache
{
    public interface IModelInfoCache
    {
        Task<ModelInfo> GetModelInfoBySku(string sku);
    }
}
