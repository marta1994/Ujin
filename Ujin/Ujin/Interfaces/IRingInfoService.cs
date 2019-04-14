using System.Threading.Tasks;
using Ujin.Controllers.Models.RingInfo;

namespace Ujin.Interfaces
{
    public interface IRingInfoService
    {
        Task<RingInfo> GetRingInfo(RingConfig config);
    }
}
