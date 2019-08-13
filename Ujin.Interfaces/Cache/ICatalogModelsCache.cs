using System.Collections.Generic;
using System.Threading.Tasks;
using Ujin.Domain.Dtos;

namespace Ujin.Interfaces.Cache
{
    public interface ICatalogModelsCache
    {
        Task<List<CatalogModel>> GetCatalogModels();
    }
}
