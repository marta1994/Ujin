namespace Ujin.Models.CallMe
{
    public class CallMeUser
    {
        private const int PHONE_LENGTH = 9;

        public string Name { get; set; }

        public string Phone { get; set; }

        public bool IsValid
        {
            get
            {
                return !string.IsNullOrEmpty(Name.Trim())
                    && IsPhoneValid();
            }
        }

        private bool IsPhoneValid()
        {
            return !string.IsNullOrEmpty(Phone) && Phone.Length == PHONE_LENGTH && ContainsNumbersOnly(Phone);
        }

        private bool ContainsNumbersOnly(string s)
        {
            if (s == null) return false;
            foreach(var character in s)
            {
                if (character < '0' || character > '9')
                {
                    return false;
                }
            }
            return true;
        }
    }
}
