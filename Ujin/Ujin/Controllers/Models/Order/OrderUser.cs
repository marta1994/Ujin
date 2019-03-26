﻿using System.ComponentModel.DataAnnotations;
using Ujin.Controllers.Attributes;

namespace Ujin.Controllers.Models.Order
{
    public class OrderUser
    {
        [NonEmptyString]
        public string Name { get; set; }

        [ValidPhone]
        public string Phone { get; set; }

        [ValidEmail]
        public string Email { get; set; }

        [Required]
        public Order Order { get; set; }
    }
}
