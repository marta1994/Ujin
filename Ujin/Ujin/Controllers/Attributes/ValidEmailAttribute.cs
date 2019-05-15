using System;
using System.ComponentModel.DataAnnotations;
using System.Net.Mail;

namespace Ujin.Controllers.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class ValidEmailAttribute : ValidationAttribute
    {
        public ValidEmailAttribute()
        {
        }

        protected override ValidationResult IsValid(
            object value, ValidationContext validationContext)
        {
            string email = (string)value;

            if (!IsEmailValid(email))
            {
                return new ValidationResult(
                    $"value of property '{validationContext.DisplayName}' is not a valid email!");
            }

            return ValidationResult.Success;
        }

        private bool IsEmailValid(string email)
        {
            try
            {
                var addr = new MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
    }
}
