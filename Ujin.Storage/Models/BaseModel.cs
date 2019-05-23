using System;

namespace Ujin.Storage.Models
{
    public abstract class BaseModel
    {
        public int Id { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime? DateModified { get; set; }
    }
}
