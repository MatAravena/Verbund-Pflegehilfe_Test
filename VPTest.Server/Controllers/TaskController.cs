using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using VPTest.Server.Data;
using VPTest.Server.Interfaces;

namespace VPTest.Server.Controllers
{
    public class TaskRepository : ITaskRepository
    {
        private readonly TasksDbContext _context;
        public TaskRepository(TasksDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskModel>> GetTasks() => await _context.TasksModels.ToListAsync();

        public async Task<TaskModel> AddTask(TaskModel task)
        {
            task.Id = _context.TasksModels.Select(x => x.Id).Max() + 1;
            _context.TasksModels.Add(task);
            await _context.SaveChangesAsync();
            return task;
        }

        public async Task<bool> UpdateTask(TaskModel task)
        {
            var existingTask = await _context.TasksModels.FindAsync(task.Id);
            if (existingTask == null) return false;

            existingTask.Description = task.Description;
            existingTask.Deadline = task.Deadline;
            existingTask.IsDone = task.IsDone;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteTask(int id)
        {
            var task = await _context.TasksModels.FindAsync(id);
            if (task == null) return false;

            _context.TasksModels.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskRepository _taskRepository;

        public TaskController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        [HttpGet(Name = "GetTasks")]
        public async Task<IEnumerable<TaskModel>> GetTasks()
        {
            return await _taskRepository.GetTasks();
        }

        [HttpPost(Name = "AddTask")]
        public async Task<TaskModel> AddTask(TaskModel task)
        {
            return await _taskRepository.AddTask(task);
        }

        [HttpPut(Name = "UpdateTask")]
        public async Task<bool> UpdateTask(TaskModel task)
        {
            return await _taskRepository.UpdateTask(task);
        }

        [HttpDelete(Name = "DeleteTask")]
        public async Task<bool> DeleteTask(int id)
        {
            return await _taskRepository.DeleteTask(id);
        }
    }
}
