using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ujin.Interfaces
{
    public interface IModelImageService
    {
        Task<List<string>> GetImagesPath(string sku);
    }
}
