using System.ComponentModel.DataAnnotations;

namespace Ujin.Storage.Models.ModelConfig
{
    internal class GemstoneSource: NamedModel
    {
        [Required]
        public string Identifier { get; set; }
    }
}
