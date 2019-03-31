using System.ComponentModel.DataAnnotations;

namespace Ujin.Data.Models
{
    public class AdditionalService
    {
        [Key]
        [MaxLength(255)]
        public string ServiceName { get; set; }

        public decimal Price { get; set; }
    }
}
