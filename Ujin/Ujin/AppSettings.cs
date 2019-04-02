using System.Collections.Generic;

namespace Ujin
{
    public class AppSettings
    {
        public string Host { get; set; }

        public MailSettings MailSettings { get; set; }

        public SocialReferences SocialReferences { get; set; }
    }

    public class MailSettings
    {
        public SmtpSettings SmtpSettings { get; set; }

        public string SupportMail { get; set; }

        public List<string> MailTo { get; set; }
    }

    public class SmtpSettings
    {
        public string Host { get; set; }

        public int Port { get; set; }

        public bool UseSsl { get; set; }

        public string Username { get; set; }

        public string Password { get; set; }
    }

    public class SocialReferences
    {
        public string Facebook { get; set; }

        public string Instagram { get; set; }

        public string Pinterest { get; set; }

        public string FacebookAppId { get; set; }
    }
}
