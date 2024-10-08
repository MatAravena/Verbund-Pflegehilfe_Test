﻿
using Microsoft.EntityFrameworkCore;
using VPTest.Server.Model;

namespace VPTest.Server.Data
{
    public class TasksDbContext : DbContext
    {
        public TasksDbContext(DbContextOptions<TasksDbContext> options)
       : base(options) { }

        public virtual DbSet<TaskModel> TasksModels { get; set; }
    }
}
