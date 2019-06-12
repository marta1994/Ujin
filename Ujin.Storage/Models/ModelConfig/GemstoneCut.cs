using System.ComponentModel.DataAnnotations;

namespace Ujin.Storage.Models.ModelConfig
{
    internal class GemstoneCut: NamedModel
    {
        [Required]
        public string Identifier { get; set; }
    }
}
