namespace Ujin.Domain.Enums
{
    public enum JewelryModelState
    {
        /// <summary>
        /// First default state form the point model is cteated till model state is set to 'Enabled'
        /// </summary>
        BuildingState = -1,

        /// <summary>
        /// Disabled after being already enabled
        /// </summary>
        Disabled = 0,

        Enabled = 1
    }
}
