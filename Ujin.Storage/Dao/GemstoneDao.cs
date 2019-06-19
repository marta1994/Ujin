using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Interfaces.Dao;
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

        public Task<List<GemstoneDto>> LoadGemstonesByIds(List<int> ids)
        {
            return _dbContext.Gemstones
                .Where(m => ids.Contains(m.Id))
                .Include(g => g.Color)
                .Include(g => g.GemstoneClass)
                .Include(g => g.GemstoneCut)
                .Include(g => g.GemstoneSource)
                .Select(g => _mapper.Map<GemstoneDto>(g))
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

        public Task<List<GemstoneDto>> LoadGemstones()
        {
            return _dbContext.Gemstones
                .Select(g => _mapper.Map<GemstoneDto>(g))
                .ToListAsync();
        }

        public Task SaveGemSources(List<GemSourceDto> gemSources)
        {
            var entities = gemSources.Select(g => _mapper.Map<GemstoneSource>(g));
            return _dbContext.UpsertEntities(entities);
        }

        public Task SaveGemClasses(List<GemClassDto> gemClasses)
        {
            var entities = gemClasses.Select(g => _mapper.Map<GemstoneClass>(g));
            return _dbContext.UpsertEntities(entities);
        }

        public Task SaveGemCuts(List<GemCutDto> gemCuts)
        {
            var entities = gemCuts.Select(g => _mapper.Map<GemstoneCut>(g));
            return _dbContext.UpsertEntities(entities);
        }

        public Task SaveGemstones(List<GemstoneDto> gemstones)
        {
            foreach(var gem in gemstones)
            {
                gem.Color = null;
                gem.GemstoneClass = null;
                gem.GemstoneCut = null;
                gem.GemstoneSource = null;
            }
            var entities = gemstones.Select(g => _mapper.Map<Gemstone>(g));
            return _dbContext.UpsertEntities(entities);
        }
    }
}
