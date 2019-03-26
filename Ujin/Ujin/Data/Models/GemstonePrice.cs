using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ujin.Data.Models
{
    public class GemstonePrice
    {
        [Key]
        public int GemstoneId { get; set; }

        [ForeignKey("GemstoneId")]
        public Gemstone Gemstone { get; set; }

        public decimal Price { get; set; }
    }
}
