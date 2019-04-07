using Ujin.Controllers.Attributes;

namespace Ujin.Controllers.Models.Price
{
    public class RingConfig
    {
        [RangeNumber(min: 1)]
        public int MetalId { get; set; }

        [RangeNumber(min: 1)]
        public int DecorationId { get; set; }

        [RangeNumber(min: 1)]
        public int GemstoneId { get; set; }

        [RangeNumber(min: 15, max: 22)]
        public decimal Size { get; set; }

        public GemstoneOption GemstoneOption { get; set; }
    }
}
