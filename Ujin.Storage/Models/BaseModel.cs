using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Ujin.Storage.Models
{
    internal abstract class BaseModel
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime? DateModified { get; set; }
    }
}
