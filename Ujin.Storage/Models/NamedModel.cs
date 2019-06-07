using System.ComponentModel.DataAnnotations;

namespace Ujin.Storage.Models
{
    internal abstract class NamedModel: BaseModel
    {
        [Required]
        public string NameKey { get; set; }
    }
}
