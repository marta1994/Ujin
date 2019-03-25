using Microsoft.AspNetCore.Http;

namespace Ujin.Interfaces
{
    public interface IUserAgentHelper
    {
        DeviceType DetermineDeviceType(HttpContext httpContext);
    }
}
