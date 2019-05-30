using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using Ujin.Interfaces;
using Ujin.Storage.Dao;

namespace Ujin.Storage
{
    public static class StorageRegistrator
    {
        public static void RegisterStorage(IServiceCollection services, IConfiguration configuration)
        {
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddDbContext<UjinContext>(
                options => options.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection"),
                    builder => builder.MigrationsAssembly(typeof(UjinContext).Assembly.FullName)));

            services.AddScoped<IAdminUserDao, AdminUserDao>();
            services.AddScoped<IGemstoneDao, GemstoneDao>();
            services.AddScoped<IColorDao, ColorDao>();
        }
    }
}
