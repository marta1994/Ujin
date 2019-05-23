namespace Ujin.Domain.Enums
{
    public enum SubscriptionOption
    {
        Email = 1 << 0,

        Viber = 1 << 1,

        All = Email | Viber,

        None = 0
    }
}
