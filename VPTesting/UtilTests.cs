using Microsoft.EntityFrameworkCore;
using Moq;
using VPTest.Server.Data;
using VPTest.Server.Model;

namespace VPTesting
{
    // IClassFixture ensure that DbContext can be used in each test
    // with out the need " using() "
    public class TasksDbContextFixture : IDisposable, IClassFixture<TasksDbContextFixture>
    {
        public TasksDbContext Context { get; private set; }

        public TasksDbContextFixture()
        {
            // Use a new in-memory database for each instance of the fixture (for test isolation)
            var options = new DbContextOptionsBuilder<TasksDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            Context = new TasksDbContext(options);
            GenerateData();
        }

        private void GenerateData()
        {
            Context.TasksModels.AddRange(new List<TaskModel>{
                            new TaskModel { Id = 1, Description = "Task 1", IsDone = false },
                            new TaskModel { Id = 2, Description = "Task 2", IsDone = true },
                            new TaskModel { Id = 3, Description = "Task 3", IsDone = false },
                            new TaskModel { Id = 4, Description = "Task 4", IsDone = true },
                            new TaskModel { Id = 5, Description = "Task 5", IsDone = false }
            });
            Context.SaveChanges();
        }

        public void Dispose()
        {
            Context.Dispose();
        }

        //public abstract class UtilTests
        //{
        //    public virtual Mock<TasksDbContext> mockContext { get; set; }
        //    public virtual Mock<DbSet<TaskModel>> mockDbSet { get; set; }

        //    protected UtilTests()
        //    {
        //        mockContext = SetupMockDbContext();
        //    }

        //    protected Mock<TasksDbContext> SetupMockDbContext()
        //    {
        //        // Mock task data
        //        var tasks = new List<TaskModel>
        //        {
        //            new TaskModel { Id = 1, Description = "Task 1", IsDone = false },
        //            new TaskModel { Id = 2, Description = "Task 2", IsDone = true },
        //            new TaskModel { Id = 3, Description = "Task 3", IsDone = false },
        //            new TaskModel { Id = 4, Description = "Task 4", IsDone = true },
        //            new TaskModel { Id = 5, Description = "Task 5", IsDone = false }
        //        };

        //        // Mock DbSet
        //        mockDbSet = new Mock<DbSet<TaskModel>>();
        //        mockDbSet.As<IQueryable<TaskModel>>().Setup(m => m.Provider).Returns(tasks.AsQueryable().Provider);
        //        mockDbSet.As<IQueryable<TaskModel>>().Setup(m => m.Expression).Returns(tasks.AsQueryable().Expression);
        //        mockDbSet.As<IQueryable<TaskModel>>().Setup(m => m.ElementType).Returns(tasks.AsQueryable().ElementType);
        //        mockDbSet.As<IQueryable<TaskModel>>().Setup(m => m.GetEnumerator()).Returns(tasks.GetEnumerator());

        //        // Mock DbContext
        //        var mockContext = new Mock<TasksDbContext>();
        //        mockContext.Setup(c => c.TasksModels).Returns(mockDbSet.Object);

        //        return mockContext;
        //    }

        //    public DbContextOptions<TasksDbContext> GetInMemoryDatabaseOptions()
        //    {
        //        return new DbContextOptionsBuilder<TasksDbContext>()
        //            .UseInMemoryDatabase("TestDatabase")
        //            .Options;
        //    }
        //}
    }

}
