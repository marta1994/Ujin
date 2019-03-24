using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Ujin.Data.Enums;

namespace Ujin.Data.Models
{
    public class User
    {
        public int Id { get; set; }

        [MaxLength(255)]
        public string Name { get; set; }

        [MaxLength(255)]
        public string Surname { get; set; }

        [MaxLength(255)]
        public string Email { get; set; }

        [MaxLength(15)]
        public string Phone { get; set; }

        public UserCreationSource CreationSource { get; set; }

        public SubscriptionOption SubscriptionOptions { get; set; }
        
        public DateTime DateCreated { get; set; }

        public DateTime? DateModified { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
