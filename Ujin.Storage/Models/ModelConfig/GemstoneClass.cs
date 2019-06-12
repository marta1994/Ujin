using System.ComponentModel.DataAnnotations;

namespace Ujin.Storage.Models.ModelConfig
{
    internal class GemstoneClass : NamedModel
    {
        [Required]
        public string Identifier { get; set; }
    }
}
