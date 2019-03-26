using System.ComponentModel.DataAnnotations.Schema;

namespace Ujin.Data.Models
{
    public class RingWeight
    {
        [ForeignKey("DecorationId")]
        public Decoration Decoration { get; set; }

        public int DecorationId {get; set;}

        [ForeignKey("MetalId")]
        public Metal Metal { get; set; }

        public int MetalId { get; set; }

        public decimal Size { get; set; }

        public decimal WeightGrams { get; set; }
    }
}
