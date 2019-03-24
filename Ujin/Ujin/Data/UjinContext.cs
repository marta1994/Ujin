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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<User>()
            .Property(u => u.DateCreated)
            .HasDefaultValue(DateTime.Now);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Orders)
                .WithOne(o => o.User)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Order>()
                .Property(o => o.DateCreated)
                .HasDefaultValue(DateTime.Now);
        }
    }
}
