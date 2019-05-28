using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ujin.Domain.ModelConfig;
using Ujin.Interfaces;
using Ujin.Storage.Models.ModelConfig;

namespace Ujin.Storage.Dao
{
    public class GemSourceDao: IGemSourceDao
    {
        private readonly UjinContext _dbContext;

        private readonly IMapper _mapper;

        public GemSourceDao(UjinContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public Task<List<GemSourceDto>> LoadGemSources()
        {
            return _dbContext.GemstoneSources
                .Select(g => _mapper.Map<GemSourceDto>(g))
                .ToListAsync();
        }

        public Task SaveGemSources(List<GemSourceDto> gemSources)
        {
            var gemSourcesEntities = gemSources.Select(g => _mapper.Map<GemstoneSource>(g));
            var addedEntities = gemSourcesEntities.Where(g => g.Id <= 0)
                .Select(e =>
                {
                    e.Id = 0;
                    return e;
                });
            _dbContext.AddRange(addedEntities);
            _dbContext.UpdateRange(gemSourcesEntities.Where(g => g.Id > 0));
            return _dbContext.SaveChangesAsync();
        }
    }
}
