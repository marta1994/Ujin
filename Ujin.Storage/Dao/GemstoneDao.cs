using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Interfaces;
using Ujin.Storage.Models;
using Ujin.Storage.Models.ModelConfig;

namespace Ujin.Storage.Dao
{
    public class GemstoneDao: IGemstoneDao
    {
        private readonly UjinContext _dbContext;

        private readonly IMapper _mapper;

        public GemstoneDao(UjinContext dbContext, IMapper mapper)
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

        public Task<List<GemClassDto>> LoadGemClasses()
        {
            return _dbContext.GemstoneClasses
                .Select(g => _mapper.Map<GemClassDto>(g))
                .ToListAsync();
        }

        public Task<List<GemCutDto>> LoadGemCuts()
        {
            return _dbContext.GemstoneCuts
                .Select(g => _mapper.Map<GemCutDto>(g))
                .ToListAsync();
        }

        public Task SaveGemSources(List<GemSourceDto> gemSources)
        {
            var entities = gemSources.Select(g => _mapper.Map<GemstoneSource>(g));
            return SaveEntities(entities);
        }

        public Task SaveGemClasses(List<GemClassDto> gemClasses)
        {
            var entities = gemClasses.Select(g => _mapper.Map<GemstoneClass>(g));
            return SaveEntities(entities);
        }

        public Task SaveGemCuts(List<GemCutDto> gemCuts)
        {
            var entities = gemCuts.Select(g => _mapper.Map<GemstoneCut>(g));
            return SaveEntities(entities);
        }

        private Task SaveEntities(IEnumerable<BaseModel> entities)
        {
            var addedEntities = entities.Where(g => g.Id <= 0)
                .Select(e =>
                {
                    e.Id = 0;
                    return e;
                });
            _dbContext.AddRange(addedEntities);
            _dbContext.UpdateRange(entities.Where(g => g.Id > 0));
            return _dbContext.SaveChangesAsync();
        }
    }
}
