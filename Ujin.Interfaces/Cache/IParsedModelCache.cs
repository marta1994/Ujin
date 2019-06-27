using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig.Parsed;

namespace Ujin.Interfaces.Cache
{
    public interface IParsedModelCache
    {
        Task<ParsedJewelryModel> GetParsedModelById(string identifier);
    }
}
