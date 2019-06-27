using Microsoft.Extensions.Caching.Memory;
using System;
using System.Threading.Tasks;
using Ujin.Interfaces.Cache;

namespace Ujin.BusinessLogic.Services.Cache
{
    public class Cache : ICache
    {
        private readonly IMemoryCache _memoryCache;

        public Cache(IMemoryCache memoryCache)
        {
            _memoryCache = memoryCache;
        }

        public Task<T> GetValue<T>(string key, Func<Task<T>> getValFunc)
        {
            return _memoryCache.GetOrCreateAsync(key, ce => getValFunc());
        }
    }
}
