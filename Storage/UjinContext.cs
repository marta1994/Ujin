using Microsoft.EntityFrameworkCore;
using Storage.Models;

namespace Storage
{
    public class UjinContext: DbContext
    {
        public DbSet<User> Users { get; set; }
    }
}
