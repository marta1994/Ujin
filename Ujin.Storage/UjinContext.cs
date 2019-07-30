using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Ujin.Domain.Enums;
using Ujin.Storage.Models;
using Ujin.Storage.Models.ModelConfig;

namespace Ujin.Storage
{
    public class UjinContext: DbContext
    {
        public UjinContext(DbContextOptions<UjinContext> options) : base(options)
        {
        }

        internal DbSet<User> Users { get; set; }

        internal DbSet<Order> Orders { get; set; }

        internal DbSet<OrderedProduct> OrderedProducts { get; set; }

        internal DbSet<AdminUser> AdminUsers { get; set; }

        internal DbSet<Color> Colors { get; set; }

        internal DbSet<Gemstone> Gemstones { get; set; }

        internal DbSet<GemstoneSource> GemstoneSources { get; set; }

        internal DbSet<GemstoneClass> GemstoneClasses { get; set; }

        internal DbSet<GemstoneCut> GemstoneCuts { get; set; }

        internal DbSet<JewelryModel> JewelryModels { get; set; }

        internal DbSet<Metal> Metals { get; set; }

        internal DbSet<ModelConfiguration> ModelConfigurations { get; set; }

        internal DbSet<SkuDescription> SkuDescriptions { get; set; }

        internal Task UpsertEntities(IEnumerable<BaseModel> entities)
        {
            var addedEntities = entities.Where(g => g.Id <= 0)
                .Select(e =>
                {
                    e.Id = 0;
                    return e;
                });
            AddRange(addedEntities);
            UpdateRange(entities.Where(g => g.Id > 0));
            return SaveChangesAsync();
        }

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
            modelBuilder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany()
                .HasForeignKey(g => g.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<OrderedProduct>()
                .HasOne(o => o.Order)
                .WithMany(o => o.OrderedProducts)
                .HasForeignKey(o => o.OrderId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<AdminUser>()
                .HasIndex(u => u.Username)
                .IsUnique();

            modelBuilder.Entity<JewelryModel>()
                .HasMany(m => m.Configurations)
                .WithOne(m => m.JewelryModel)
                .HasForeignKey(m => m.JewelryModelId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SkuDescription>()
                .HasIndex(s => s.Sku);

            modelBuilder.Entity<SkuDescription>()
                .HasKey(s => s.Id);

            modelBuilder.Entity<SkuDescription>()
                .HasOne(s => s.JewelryModel)
                .WithMany(m => m.SkuDescriptions)
                .HasForeignKey(s => s.JewelryModelId);

            modelBuilder.Entity<JewelryModel>()
                .HasIndex(m => m.NameKey)
                .IsUnique();

            modelBuilder.Entity<JewelryModel>()
                .HasIndex(g => g.Identifier)
                .IsUnique();

            modelBuilder.Entity<JewelryModel>()
                .Property(m => m.ModelState)
                .HasDefaultValue(JewelryModelState.BuildingState);

            modelBuilder.Entity<ModelConfiguration>()
                .HasIndex(m => new { m.NameKey, m.JewelryModelId })
                .IsUnique();

            modelBuilder.Entity<ModelConfiguration>()
                .HasIndex(m => new { m.Identifier, m.JewelryModelId })
                .IsUnique();

            modelBuilder.Entity<Metal>()
                .HasIndex(m => m.NameKey)
                .IsUnique();

            modelBuilder.Entity<Metal>()
                .HasIndex(m => m.Identifier)
                .IsUnique();

            modelBuilder.Entity<GemstoneClass>()
                .HasIndex(g => g.NameKey)
                .IsUnique();

            modelBuilder.Entity<GemstoneClass>()
                .HasIndex(m => m.Identifier)
                .IsUnique();

            modelBuilder.Entity<GemstoneCut>()
                .HasIndex(g => g.NameKey)
                .IsUnique();

            modelBuilder.Entity<GemstoneCut>()
                .HasIndex(m => m.Identifier)
                .IsUnique();

            modelBuilder.Entity<GemstoneSource>()
                .HasIndex(g => g.NameKey)
                .IsUnique();

            modelBuilder.Entity<GemstoneSource>()
                .HasIndex(m => m.Identifier)
                .IsUnique();

            modelBuilder.Entity<Color>()
                .HasIndex(c => c.NameKey)
                .IsUnique();

            modelBuilder.Entity<Color>()
                .HasIndex(c => c.ColorHexCode)
                .IsUnique();

            modelBuilder.Entity<Gemstone>()
                .HasIndex(c => c.Identifier)
                .IsUnique();

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
