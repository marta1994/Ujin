using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
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

        public DbSet<AdminUser> AdminUsers { get; set; }

        public DbSet<Color> Colors { get; set; }

        public DbSet<Gemstone> Gemstones { get; set; }

        public DbSet<GemstoneSource> GemstoneSources { get; set; }

        public DbSet<GemstoneClass> GemstoneClasses { get; set; }

        public DbSet<GemstoneCut> GemstoneCuts { get; set; }

        public DbSet<JewelryModel> JewelryModels { get; set; }

        public DbSet<Metal> Metals { get; set; }

        public DbSet<ModelConfiguration> ModelConfigurations { get; set; }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            OnBeforeSaving();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            OnBeforeSaving();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void OnBeforeSaving()
        {
            var entries = ChangeTracker.Entries();
            var now = DateTime.UtcNow;
            foreach (var entry in entries)
            {
                if (entry.Entity is BaseModel baseModel)
                {
                    switch (entry.State)
                    {
                        case EntityState.Modified:
                            baseModel.DateModified = now;
                            var dt = entry.GetDatabaseValues().GetValue<DateTime>(nameof(baseModel.DateCreated));
                            baseModel.DateCreated = dt;
                            break;

                        case EntityState.Added:
                            baseModel.DateCreated = now;
                            baseModel.DateModified = null;
                            break;
                    }
                }
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AdminUser>()
                .HasIndex(u => u.Username);

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
