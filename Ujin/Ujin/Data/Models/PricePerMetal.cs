using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ujin.Data.Models
{
    public class PricePerMetal
    {
        public int Id { get; set; }

        public int MetalId { get; set; }

        [ForeignKey("MetalId")]
        public Metal Metal { get; set; }

        [Required]
        public string ItemName { get; set; }

        public decimal ItemPrice { get; set; }
    }
}
