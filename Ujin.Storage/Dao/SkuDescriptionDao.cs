using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ujin.Domain.Dtos;
using Ujin.Interfaces.Dao;
using Ujin.Storage.Models.ModelConfig;

namespace Ujin.Storage.Dao
{
    public class SkuDescriptionDao : ISkuDescriptionDao
    {
        private readonly UjinContext _dbContext;

        private readonly IMapper _mapper;

        public SkuDescriptionDao(UjinContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public Task<List<SkuDescriptionDto>> LoadSkuDescriptionsByModelId(int modelId)
        {
            return _dbContext.SkuDescriptions
                .Where(s => s.JewelryModelId == modelId)
                .Select(s => _mapper.Map<SkuDescriptionDto>(s))
                .ToListAsync();
        }

        public async Task<SkuDescriptionDto> LoadSkuDescription(string sku)
        {
            return (await _dbContext.SkuDescriptions
                .Where(s => s.Sku.ToLower() == sku.ToLower())
                .Select(s => _mapper.Map<SkuDescriptionDto>(s))
                .ToListAsync())
                .FirstOrDefault();
        }

        public Task SaveSkuDescriptions(List<SkuDescriptionDto> skuDescriptions)
        {
            var entities = skuDescriptions.Select(g => _mapper.Map<SkuDescription>(g));
            return _dbContext.UpsertEntities(entities);
        }
    }
}
