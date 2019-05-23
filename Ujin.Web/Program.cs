using AspCoreServer;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.IO;

public class Program {
     public static void Main (string[] args) {
         var host = BuildWebHost (args);
         using (var scope = host.Services.CreateScope ()) {
             var services = scope.ServiceProvider;
         }

         host.Run ();
     }
     public static IWebHost BuildWebHost (string[] args) =>
         WebHost.CreateDefaultBuilder (args)
         .UseKestrel ()
         .UseContentRoot (Directory.GetCurrentDirectory ())
         .UseIISIntegration ()
         .UseStartup<Startup> ()
         .Build ();
 }
