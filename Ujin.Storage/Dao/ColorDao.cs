using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Interfaces;
using Ujin.Storage.Models;

namespace Ujin.Storage.Dao
{
    public class ColorDao: IColorDao
    {
        private readonly UjinContext _dbContext;

        private readonly IMapper _mapper;

        public ColorDao(UjinContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public Task<List<ColorDto>> LoadColors()
        {
            return _dbContext.Colors
                .Select(g => _mapper.Map<ColorDto>(g))
                .ToListAsync();
        }

        public Task SaveColors(List<ColorDto> colors)
        {
            var entities = colors.Select(g => _mapper.Map<Color>(g));
            return _dbContext.UpsertEntities(entities);
        } 
    }
}
