namespace Ujin.Storage.Models.ModelConfig
{
    internal class Gemstone : BaseModel
    {
        public double WidthMm { get; set; }

        public double HeightMm { get; set; }

        public double Price { get; set; }
        
        public double? Weight { get; set; }

        public int ColorId { get; set; }

        public virtual Color Color { get; set; }

        public int GemstoneClassId { get; set; }

        public virtual GemstoneClass GemstoneClass { get; set; }

        public int GemstoneSourceId { get; set; }

        public virtual GemstoneSource GemstoneSource { get; set; }

        public int GemstoneCutId { get; set; }

        public virtual GemstoneCut GemstoneCut { get; set; }
    }
}
