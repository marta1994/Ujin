using System;

namespace Ujin.Domain.Enums
{
    [Flags]
    public enum ProductLabel
    {
        None = 0,
        TopSells = 1,
        NewProduct = 2
    }
}
