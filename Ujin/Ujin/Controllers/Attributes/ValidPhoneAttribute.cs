using System;
using System.ComponentModel.DataAnnotations;

namespace Ujin.Controllers.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class ValidPhoneAttribute : ValidationAttribute
    {
        private const int PHONE_LENGTH = 13;

        public ValidPhoneAttribute()
        {
        }

        protected override ValidationResult IsValid(
            object value, ValidationContext validationContext)
        {
            string phone = (string)value;

            if (!IsPhoneValid(phone))
            {
                return new ValidationResult(
                    $"value of property '{validationContext.DisplayName}' is not a valid phone number!");
            }

            return ValidationResult.Success;
        }

        private bool IsPhoneValid(string phone)
        {
            return !string.IsNullOrEmpty(phone)
                && phone.Length == PHONE_LENGTH
                && phone.StartsWith('+')
                && ContainsNumbersOnly(phone.Substring(1));
        }

        private bool ContainsNumbersOnly(string s)
        {
            if (s == null) return false;
            foreach (var character in s)
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
