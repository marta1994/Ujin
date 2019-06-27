using System.Threading.Tasks;
using Ujin.Domain.Dtos.ModelConfig.Parsed;
using Ujin.Domain.Enums;
using Ujin.Interfaces.Cache;
using Ujin.Interfaces.Dao;

namespace Ujin.BusinessLogic.Services.Cache
{
    public class ParsedModelCache: IParsedModelCache
    {
        private const string ParsedModelFormat = "jewelryModel.{0}";

        private readonly ICache _cache;

        private readonly IJewelryModelDao _jewelryModelDao;

        public ParsedModelCache(
            ICache cache,
            IJewelryModelDao jewelryModelDao)
        {
            _cache = cache;
            _jewelryModelDao = jewelryModelDao;
        }

        public Task<ParsedJewelryModel> GetParsedModelById(string identifier)
        {
            var key = string.Format(ParsedModelFormat, identifier);
            return _cache.GetValue(key, async () => {
                identifier = identifier.ToLower();
                var model = await _jewelryModelDao.LoadJewelryModelByIdentifier(identifier);
                if (model.ModelState != JewelryModelState.Enabled)
                    return null;
                return model;
            });
        }
    }
}
