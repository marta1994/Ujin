using Microsoft.EntityFrameworkCore;
using Ujin.Storage.Models;

namespace Ujin.Storage
{
    public class UjinContext: DbContext
    {
        public UjinContext(DbContextOptions<UjinContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}
