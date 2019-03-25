using System.Collections.Generic;

namespace Ujin.Interfaces
{
    public class SimpleMail
    {
        public string From { get; set; }

        public IEnumerable<string> To { get; set; }

        public string Subject { get; set; }

        public string Body { get; set; }
    }
}
