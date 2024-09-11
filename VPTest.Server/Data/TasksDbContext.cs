
using Microsoft.EntityFrameworkCore;

namespace VPTest.Server.Data
{
    public class TasksDbContext : DbContext
    {
        public TasksDbContext(DbContextOptions<TasksDbContext> options)
       : base(options) { }

        public DbSet<Data.TaskModel> TasksModels { get; set; }
    }
}
