using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ujin.Controllers.Models.Price;

namespace Ujin.Interfaces
{
    public interface IPriceService
    {
        Task<decimal> CalculateRingPrice(RingConfig config);
    }
}
