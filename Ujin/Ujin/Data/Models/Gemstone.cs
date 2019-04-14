using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ujin.Data.Models
{
    public class Gemstone
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public decimal? Weight { get; set; }

        public decimal Price { get; set; }
    }
}
