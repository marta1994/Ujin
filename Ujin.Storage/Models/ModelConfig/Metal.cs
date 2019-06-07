using System.ComponentModel.DataAnnotations;

namespace Ujin.Storage.Models.ModelConfig
{
    internal class Metal: NamedModel
    {
        [Required]
        public string Identifier { get; set; }

        public double PricePerGram { get; set; }
    }
}
