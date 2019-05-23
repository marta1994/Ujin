using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Ujin.Storage
{
    public static class StorageRegistrator
    {
        public static void RegisterStorage(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<UjinContext>(
                options => options.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection"),
                    builder => builder.MigrationsAssembly(typeof(UjinContext).Assembly.FullName)));
        }
    }
}
