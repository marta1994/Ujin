using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System;
using System.Globalization;
using Ujin.BusinessLogic.Services;
using Ujin.BusinessLogic.Services.Cache;
using Ujin.BusinessLogic.Services.Model;
using Ujin.BusinessLogic.Services.Order;
using Ujin.Domain;
using Ujin.Interfaces;
using Ujin.Interfaces.Cache;
using Ujin.Storage;
using Ujin.Web.Models;

namespace Ujin.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddHttpsRedirection(options =>
            {
                options.HttpsPort = 443;
            });

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddMemoryCache();

            services.Configure<AppSettings>(options => Configuration.GetSection("AppSettings").Bind(options));
            var appSettings = services.BuildServiceProvider().GetService<IOptions<AppSettings>>().Value;
            services.AddSingleton(appSettings);

            StorageRegistrator.RegisterStorage(services, Configuration);

            services.AddSingleton(appSettings);
            services.AddScoped<ICache, Cache>();
            services.AddScoped<IModelInfoCache, ModelInfoCache>();
            services.AddScoped<IParsedModelCache, ParsedModelCache>();
            services.AddScoped<ICatalogModelsCache, CatalogModelsCache>();
            services.AddScoped<IJewelryModelService, JewelryModelService>();
            services.AddScoped<IModelImageService, ModelImageService>();
            services.AddScoped<ISkuDescriptionService, SkuDescriptionService>();
            services.AddScoped<IOrderService, OrderService>();
            if (appSettings.MailSettings.SmtpSettings.Host == "localhost")
            {
                services.AddScoped<IMailSender, DummyMailSender>();
            }
            else
            {
                services.AddScoped<IMailSender, MailSender>();
            }
            services.AddScoped<ModelParser>();
            services.AddScoped<VariablesEvaluator>();
            services.AddScoped<ExpressionCalculatorService>();
            services.AddScoped<SiteMapModelService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(name: "sitemap", template: "sitemap.xml",
                    defaults: new { controller = "Sitemap", action = "Index" });
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });

            CultureInfo.DefaultThreadCurrentCulture = CultureInfo.InvariantCulture;
            CultureInfo.DefaultThreadCurrentUICulture = CultureInfo.InvariantCulture;
        }
    }
}
