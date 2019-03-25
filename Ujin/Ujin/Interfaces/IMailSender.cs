using System.Threading.Tasks;

namespace Ujin.Interfaces
{
    public interface IMailSender
    {
        Task SendMessage(SimpleMail simpleMail);
    }
}
