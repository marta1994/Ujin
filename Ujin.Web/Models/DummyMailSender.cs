using System.Threading.Tasks;
using Ujin.Domain;
using Ujin.Interfaces;

namespace Ujin.Web.Models
{
    public class DummyMailSender : IMailSender
    {
        public Task SendMessage(SimpleMail simpleMail)
        {
            return Task.CompletedTask;
        }
    }
}
