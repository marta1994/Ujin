using Microsoft.EntityFrameworkCore;
using Ujin.Storage.Models;
using Ujin.Storage.Models.ModelConfig;

namespace Ujin.Storage
{
    public class UjinContext: DbContext
    {
        public UjinContext(DbContextOptions<UjinContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Color> Colors { get; set; }

        public DbSet<Gemstone> Gemstones { get; set; }

        public DbSet<GemstoneSource> GemstoneSources { get; set; }

        public DbSet<GemstoneClass> GemstoneClasses { get; set; }

        public DbSet<GemstoneCut> GemstoneCuts { get; set; }

        public DbSet<JewelryModel> JewelryModels { get; set; }

        public DbSet<Metal> Metals { get; set; }

        public DbSet<ModelConfiguration> ModelConfigurations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<JewelryModel>()
                .HasMany(m => m.Configurations)
                .WithOne(m => m.JewelryModel)
                .HasForeignKey(m => m.JewelryModelId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Gemstone>()
                .HasOne(g => g.Color)
                .WithMany()
                .HasForeignKey(g => g.ColorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Gemstone>()
                .HasOne(g => g.GemstoneClass)
                .WithMany()
                .HasForeignKey(g => g.GemstoneClassId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Gemstone>()
                .HasOne(g => g.GemstoneCut)
                .WithMany()
                .HasForeignKey(g => g.GemstoneCutId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Gemstone>()
                .HasOne(g => g.GemstoneSource)
                .WithMany()
                .HasForeignKey(g => g.GemstoneSourceId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
