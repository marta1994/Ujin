using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using System.Linq;
using System.Threading.Tasks;
using Ujin.Domain;
using Ujin.Interfaces;

namespace Ujin.BusinessLogic.Services
{
    public class MailSender : IMailSender
    {
        private readonly SmtpSettings smtpSettings;

        public MailSender(AppSettings appSettingsOptions)
        {
            smtpSettings = appSettingsOptions.MailSettings.SmtpSettings;
        }

        public async Task SendMessage(SimpleMail simpleMail)
        {
            var message = new MimeMessage();
            message.To.AddRange(simpleMail.To.Select(m => new MailboxAddress(m)));
            message.From.Add(new MailboxAddress(simpleMail.From));
            message.Subject = simpleMail.Subject;
            message.Body = new TextPart(TextFormat.Plain)
            {
                Text = simpleMail.Body
            };

            using (var smtpClient = new SmtpClient())
            {
                smtpClient.ServerCertificateValidationCallback = (s, c, h, e) => true;
                await smtpClient.ConnectAsync(smtpSettings.Host, smtpSettings.Port, SecureSocketOptions.Auto);
                smtpClient.AuthenticationMechanisms.Remove("XOAUTH2");
                await smtpClient.AuthenticateAsync(smtpSettings.Username, smtpSettings.Password);
                await smtpClient.SendAsync(message);
                await smtpClient.DisconnectAsync(true);
            }
        }
    }
}
