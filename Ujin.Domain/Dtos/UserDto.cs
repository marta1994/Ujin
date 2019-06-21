using Ujin.Domain.Enums;

namespace Ujin.Domain.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }

        public string Name { get; set; }
        
        public string Surname { get; set; }
        
        public string Email { get; set; }
        
        public string Phone { get; set; }

        public UserCreationSource CreationSource { get; set; }

        public SubscriptionOption SubscriptionOptions { get; set; }
    }
}
