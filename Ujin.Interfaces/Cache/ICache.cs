using System;
using System.Threading.Tasks;

namespace Ujin.Interfaces.Cache
{
    public interface ICache
    {
        Task<T> GetValue<T>(string key, Func<Task<T>> createFunc);
    }
}
