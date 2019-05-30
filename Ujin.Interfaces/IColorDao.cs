using System.Collections.Generic;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig;

namespace Ujin.Interfaces
{
    public interface IColorDao
    {
        Task<List<ColorDto>> LoadColors();

        Task SaveColors(List<ColorDto> colors);
    }
}
