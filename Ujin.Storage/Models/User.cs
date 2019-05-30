using System.ComponentModel.DataAnnotations;
using Ujin.Domain.Enums;

namespace Ujin.Storage.Models
{
    internal class User : BaseModel
    {
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
    }
}
