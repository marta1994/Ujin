﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Ujin.Interfaces.Dao;
using Ujin.Storage.Dao;

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

            services.AddScoped<IAdminUserDao, AdminUserDao>();
            services.AddScoped<IUserDao, UserDao>();
            services.AddScoped<IOrderDao, OrderDao>();
            services.AddScoped<IGemstoneDao, GemstoneDao>();
            services.AddScoped<IColorDao, ColorDao>();
            services.AddScoped<IMetalDao, MetalDao>();
            services.AddScoped<IJewelryModelDao, JewelryModelDao>();
            services.AddScoped<ISkuDescriptionDao, SkuDescriptionDao>();
        }
    }
}
