﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig;
using Ujin.Domain.Enums;
using Ujin.Interfaces;
using Ujin.Storage.Models;
using Ujin.Storage.Models.ModelConfig;

namespace Ujin.Storage.Dao
{
    public class JewelryModelDao: IJewelryModelDao
    {
        private readonly UjinContext _dbContext;

        private readonly IMapper _mapper;

        public JewelryModelDao(UjinContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public Task<List<JewelryModelDto>> LoadJewelryModels()
        {
            return _dbContext.JewelryModels
                .Select(m => _mapper.Map<JewelryModelDto>(m))
                .ToListAsync();
        }

        public async Task<JewelryModelDto> LoadJewelryModelById(int id)
        {
            return (await _dbContext.JewelryModels
                .Where(m => m.Id == id)
                .Include(m => m.Configurations)
                .Select(m => _mapper.Map<JewelryModelDto>(m))
                .ToListAsync()).FirstOrDefault();
        }

        public Task SaveJewelryModel(JewelryModelDto jewelryModel)
        {
            var jm = _mapper.Map<JewelryModel>(jewelryModel);
            var entities = new List<BaseModel> { jm }.Concat(jm.Configurations);
            return _dbContext.UpsertEntities(entities);
        }

        public Task SetEnabledState(int modelId, bool enabled)
        {
            var model = _dbContext.JewelryModels.Find(modelId);
            if (model == null)
                throw new ApplicationException($"No model with id = '{modelId}' exists!");
            model.ModelState = enabled ? JewelryModelState.Enabled :
                (model.ModelState == JewelryModelState.BuildingState
                ? JewelryModelState.BuildingState : JewelryModelState.Disabled);
            return _dbContext.UpsertEntities(new[] { model });
        }
    }
}