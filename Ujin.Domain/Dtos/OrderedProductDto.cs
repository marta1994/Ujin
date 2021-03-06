﻿namespace Ujin.Domain.Dtos
{
    public class OrderedProductDto
    {
        public int Id { get; set; }

        public int OrderId { get; set; }

        public string Sku { get; set; }

        public string SerializedProduct { get; set; }

        public int Number { get; set; }

        public string ProductLink { get; set; }
    }
}
