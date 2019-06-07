namespace Ujin.Domain.Dtos.ModelConfig
{
    public class GemstoneDto
    {
        public int Id { get; set; }

        public string Identifier { get; set; }

        public double WidthMm { get; set; }

        public double HeightMm { get; set; }

        public double Price { get; set; }

        public double? Weight { get; set; }

        public int ColorId { get; set; }

        public int GemstoneClassId { get; set; }

        public int GemstoneSourceId { get; set; }

        public int GemstoneCutId { get; set; }
    }
}
