using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Interfaces;
using Ujin.Storage.Models.ModelConfig;

namespace Ujin.Storage.Dao
{
    public class MetalDao : IMetalDao
    {
        private readonly UjinContext _dbContext;

        private readonly IMapper _mapper;

        public MetalDao(UjinContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public Task<List<MetalDto>> LoadMetals()
        {
            return _dbContext.Metals
                .Select(g => _mapper.Map<MetalDto>(g))
                .ToListAsync();
        }

        public Task SaveMetals(List<MetalDto> metals)
        {
            var entities = metals.Select(g => _mapper.Map<Metal>(g));
            return _dbContext.UpsertEntities(entities);
        }
    }
}
