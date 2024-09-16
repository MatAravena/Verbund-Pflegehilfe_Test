using Moq;
using Microsoft.EntityFrameworkCore;
using VPTest.Server.Data;
using VPTest.Server.Implementation;
using VPTest.Server.Model;

namespace VPTesting
{
    //my own old way
    //public class TestTaskRepository : UtilTests

    public class TestTaskRepository 
    {
        private readonly TasksDbContext _context;
        public TestTaskRepository(TasksDbContextFixture fixture)
        {
            // Use the fixture's DbContext instance for all tests
            _context = fixture.Context;
        }

        [Fact]
        public async Task GetAllTasksAsync_ReturnsTasks()
        {
            // Arrange
            var repository = new TaskRepository(_context);

            // Act
            var result = await repository.GetAllTasksAsync();

            // Assert
            Assert.Equal(5, result.Count());
        }

        [Fact]
        public async Task CreateTasksAsync_Success()
        {
            // Arrange
            // Arrange
            var newTask = new TaskDTO
            {
                Id = 0,
                Description = "New Task Testing",
                Deadline = DateTime.Now,
                IsDone = false
            };

            var repository = new TaskRepository(_context);

            // Act
            await repository.CreateTaskAsync(newTask);

            // Get new ID
            var listTasks = await repository.GetAllTasksAsync();
            int newID = listTasks.Max(t => t.Id);

            // Assert
            var task = await _context.TasksModels.FindAsync(newID);
            Assert.NotNull(task);
            Assert.Equal("New Task Testing", task.Description);
        }

        [Fact]
        public async Task UpdateTaskAsync_WhenTaskExists_Success()
        {
            // Arrange
            var repository = new TaskRepository(_context);
            var updatedTask = new TaskDTO
            {
                Id = 1,
                Description = "Updated Task",
                Deadline = DateTime.Now,
                IsDone = true
            };

            // Act
            var result = await repository.UpdateTaskAsync(updatedTask);

            // Assert
            Assert.True(result);

            var task = await _context.TasksModels.FindAsync(1);
            Assert.Equal("Updated Task", task.Description);
            Assert.True(task.IsDone);
        }


        [Fact]
        public async Task UpdateTaskAsync_WhenTaskNotExists()
        {
            // Arrange
            var repository = new TaskRepository(_context);
            var updatedTask = new TaskDTO
            {
                Id = 50,
                Description = "Updated Task",
                Deadline = DateTime.Now,
                IsDone = true
            };

            // Act
            var result = await repository.UpdateTaskAsync(updatedTask);

            // Assert
            Assert.False(result);
        }

        [Fact]
        public async Task DeleteTaskAsync_WhenTaskExists_Success()
        {
            // Arrange
            var repository = new TaskRepository(_context);

            // Act
            var result = await repository.DeleteTaskAsync(1);

            // Assert
            Assert.True(result);

            var task = await _context.TasksModels.FindAsync(1);
            Assert.Null(task);
        }

        [Fact]
        public async Task DeleteTaskAsync_WhenTaskDoesNotExist()
        {
            // Arrange
            var repository = new TaskRepository(_context);

            // Act
            var result = await repository.DeleteTaskAsync(100); // Non-existent task ID

            // Assert
            Assert.False(result);
        }
    }
}
