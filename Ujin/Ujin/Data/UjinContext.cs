using Microsoft.EntityFrameworkCore;
using System;
using Ujin.Data.Models;

namespace Ujin.Data
{
    public class UjinContext : DbContext
    {
        public UjinContext(DbContextOptions<UjinContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<Decoration> Decorations { get; set; }

        public DbSet<Gemstone> Gemstones { get; set; }

        public DbSet<Metal> Metals { get; set; }

        public DbSet<GemstonePrice> GemstonePrices { get; set; }

        public DbSet<PricePerMetal> PricePerMetals { get; set; }

        public DbSet<RingWeight> RingWeights { get; set; }

        public DbSet<AdditionalService> AdditionalServices { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Order>().ToTable("Order");
            modelBuilder.Entity<Decoration>().ToTable("Decoration");
            modelBuilder.Entity<Gemstone>().ToTable("Gemstone");
            modelBuilder.Entity<Metal>().ToTable("Metal");
            modelBuilder.Entity<GemstonePrice>().ToTable("GemstonePrice");
            modelBuilder.Entity<PricePerMetal>().ToTable("PricePerMetal");
            modelBuilder.Entity<RingWeight>().ToTable("RingWeight");
            modelBuilder.Entity<AdditionalService>().ToTable("AdditionalService");

            modelBuilder.Entity<User>()
            .Property(u => u.DateCreated)
            .HasDefaultValue(new DateTime(2019, 1, 1));

            modelBuilder.Entity<User>()
                .HasMany(u => u.Orders)
                .WithOne(o => o.User)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Order>()
                .Property(o => o.DateCreated)
                .HasDefaultValue(new DateTime(2019, 1, 1));

            modelBuilder.Entity<Gemstone>()
                .HasOne(g => g.Price)
                .WithOne(gp => gp.Gemstone)
                .HasForeignKey<GemstonePrice>(gp => gp.GemstoneId);

            modelBuilder.Entity<RingWeight>()
                .HasOne(pm => pm.Metal);

            modelBuilder.Entity<RingWeight>()
                .HasOne(pm => pm.Decoration);

            modelBuilder.Entity<RingWeight>()
                .HasKey(r => new { r.MetalId, r.DecorationId, r.Size });

            modelBuilder.Entity<RingWeight>()
                .HasIndex(p => new { p.MetalId, p.DecorationId, p.Size })
                .IsUnique();

            modelBuilder.Entity<PricePerMetal>()
                .HasOne(pm => pm.Metal);
        }
    }
}
