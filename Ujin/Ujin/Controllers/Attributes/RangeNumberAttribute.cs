using System;
using System.ComponentModel.DataAnnotations;

namespace Ujin.Controllers.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class RangeNumberAttribute : ValidationAttribute
    {
        public RangeNumberAttribute(double min, double max)
        {
            Min = min;
            Max = max;
        }

        public RangeNumberAttribute(double min)
        {
            Min = min;
        }

        public double? Min { get; set; }

        public double? Max { get; set; }

        protected override ValidationResult IsValid(
            object value, ValidationContext validationContext)
        {
            var val = double.Parse(value.ToString());

            if (Min.HasValue && val < Min)
            {
                return new ValidationResult($"value of property '{validationContext.DisplayName}' should not be less than {Min}!");
            }

            if (Max.HasValue && val > Max)
            {
                return new ValidationResult($"value of property '{validationContext.DisplayName}' should not be greater than {Max}!");
            }

            return ValidationResult.Success;
        }
    }
}
