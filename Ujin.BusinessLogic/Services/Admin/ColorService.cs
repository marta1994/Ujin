using System.Collections.Generic;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Interfaces;

namespace Ujin.BusinessLogic.Services.Admin
{
    public class ColorService : IColorService
    {
        private readonly IColorDao _colorDao;

        public ColorService(IColorDao colorDao)
        {
            _colorDao = colorDao;
        }

        public Task<List<ColorDto>> LoadColors()
        {
            return _colorDao.LoadColors();
        }

        public Task SaveColors(List<ColorDto> colors)
        {
            return _colorDao.SaveColors(colors);
        }
    }
}
