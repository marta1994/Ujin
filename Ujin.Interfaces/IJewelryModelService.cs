﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig;

namespace Ujin.Interfaces
{
    public interface IJewelryModelService
    {
        Task<List<JewelryModelDto>> LoadJewelryModels();

        Task<JewelryModelDto> LoadJewelryModelById(int id);

        Task SaveJewelryModel(JewelryModelDto jewelryModel);

        Task SetEnabledState(int modelId, bool enabled);
    }
}