using System.ComponentModel.DataAnnotations;

namespace Ujin.Storage.Models
{
    public class AdminUser: BaseModel
    {
        [Required]
        [MaxLength(255)]
        public string FirstName { get; set; }

        public string LastName { get; set; }

        [Required]
        [MaxLength(255)]
        public string Username { get; set; }

        [Required]
        [MaxLength(32)]
        public string Password { get; set; }

        public string Email { get; set; }

        public string Phone { get; set; }
    }
}
