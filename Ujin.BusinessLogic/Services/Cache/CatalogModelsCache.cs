using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ujin.Domain.Dtos;
using Ujin.Domain.Enums;
using Ujin.Interfaces.Cache;
using Ujin.Interfaces.Dao;

namespace Ujin.BusinessLogic.Services.Cache
{
    public class CatalogModelsCache : ICatalogModelsCache
    {
        private const string CatalogModelsKey = "catalogModels";

        private readonly ICache _cache;

        private readonly IJewelryModelDao _jewelryModelDao;

        public CatalogModelsCache(IJewelryModelDao jewelryModelDao, ICache cache)
        {
            _jewelryModelDao = jewelryModelDao;
            _cache = cache;
        }

        public Task<List<CatalogModel>> GetCatalogModels()
        {
            return _cache.GetValue(CatalogModelsKey, async () => {
                var models = (await _jewelryModelDao.LoadJewelryModels())
                .Where(m => m.ModelState == JewelryModelState.Enabled)
                .ToList();
                return models.Select(m => new CatalogModel
                {
                    Identifier = m.Identifier,
                    NameKey = m.NameKey,
                    ImagePath = m.MainImage
                }).ToList();
            });
        }
    }
}
