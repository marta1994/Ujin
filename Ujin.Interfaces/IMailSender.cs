using System.Threading.Tasks;
using Ujin.Domain;

namespace Ujin.Interfaces
{
    public interface IMailSender
    {
        Task SendMessage(SimpleMail simpleMail);
    }
}
