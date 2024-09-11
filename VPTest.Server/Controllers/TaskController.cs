using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using VPTest.Server.Data;

namespace VPTest.Server.Controllers
{
    public interface ITaskRepository
    {
        Task<IEnumerable<TaskModel>> GetTasks();
        Task<TaskModel> AddTask(TaskModel task);
        Task<bool> UpdateTask(TaskModel task);
        Task<bool> DeleteTask(int id);
    }

    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase, ITaskRepository
    {
        private TasksDbContext _context;
        public TaskController(TasksDbContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetTasks")]
        public async Task<IEnumerable<TaskModel>> GetTasks()
        {
            return await _context.TasksModels.ToListAsync();
        }

        [HttpPost(Name = "AddTask")]
        public async Task<TaskModel> AddTask(TaskModel _task)
        {
            _task.Id = _context.TasksModels.Select(x => x.Id).Max() + 1;
            _context.TasksModels.Add(_task);
            await _context.SaveChangesAsync();
            return _task;
        }

        [HttpPut(Name = "UpdateTask")]
        public async Task<bool> UpdateTask(TaskModel _task)
        {
            var existingTask = await _context.TasksModels.FindAsync(_task.Id);
            if (existingTask == null) return false;

            existingTask.Description = _task.Description;
            existingTask.Deadline = _task.Deadline;
            existingTask.IsDone = _task.IsDone;

            await _context.SaveChangesAsync();
            return true;
        }

        [HttpDelete(Name = "DeleteTask")]
        public async Task<bool> DeleteTask(int id)
        {
            var task = await _context.TasksModels.FindAsync(id);
            if (task == null) return false;

            _context.TasksModels.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
