using System;
using System.ComponentModel.DataAnnotations;

namespace Ujin.Data.Models
{
    public class Order
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime? DateModified { get; set; }

        [Required]
        public string Definition { get; set; }
    }
}
