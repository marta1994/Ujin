using Microsoft.EntityFrameworkCore;
using Ujin.Data.Models;

namespace Ujin.Data
{
    public class UjinContext: DbContext
    {
        public UjinContext(DbContextOptions<UjinContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
        }
    }
}
