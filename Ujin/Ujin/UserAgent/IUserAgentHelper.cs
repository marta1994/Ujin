using Microsoft.AspNetCore.Http;

namespace Ujin.UserAgent
{
    public interface IUserAgentHelper
    {
        DeviceType DetermineDeviceType(HttpContext httpContext);
    }
}
