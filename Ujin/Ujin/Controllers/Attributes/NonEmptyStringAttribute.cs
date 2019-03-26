using System;
using System.ComponentModel.DataAnnotations;

namespace Ujin.Controllers.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class NonEmptyStringAttribute : ValidationAttribute
    {
        public NonEmptyStringAttribute()
        {
        }

        protected override ValidationResult IsValid(
            object value, ValidationContext validationContext)
        {
            string str = (string)value;

            if (string.IsNullOrEmpty(str?.Trim()))
            {
                return new ValidationResult($"value of property '{validationContext.DisplayName}' should not be empty!");
            }

            return ValidationResult.Success;
        }
    }
}
