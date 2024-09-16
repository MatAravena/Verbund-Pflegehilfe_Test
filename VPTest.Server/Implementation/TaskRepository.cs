using Microsoft.EntityFrameworkCore;
using VPTest.Server.Data;
using VPTest.Server.Interfaces;
using VPTest.Server.Model;

namespace VPTest.Server.Implementation
{
    public class TaskRepository: GenericRepository<TaskModel>, ITask
    {
        private readonly TasksDbContext _context;

        public TaskRepository(TasksDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TaskDTO>> GetAllTasksAsync()
        {
            var tasks = await _context.TasksModels.ToListAsync();
            return TaskDTO.MapToDTO(tasks);
        }

        public async Task<TaskDTO> CreateTaskAsync(TaskDTO task)
        {
            //task.Id = _context.TasksModels.Any() ? _context.TasksModels.Max(x => x.Id) + 1 : 1;
            //var newTask = TaskModel.createNewTask(task.Id, task.Description, task.Deadline, task.IsDone);
            //_context.TasksModels.Add(newTask);
            //await _context.SaveChangesAsync();
            //return task;

            TaskModel newTask = TaskModel.createNewTask(task.Id, task.Description, task.Deadline, task.IsDone);
            await AddAsync(newTask);
            return task;
        }

        public async Task<bool> UpdateTaskAsync(TaskDTO task)
        {
            var existingTask = await _context.TasksModels.FindAsync(task.Id);
            if (existingTask == null) return false;

            existingTask.Description = task.Description;
            existingTask.Deadline = task.Deadline;
            existingTask.IsDone = task.IsDone;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            var task = await _context.TasksModels.FindAsync(id);
            if (task == null) return false;

            _context.TasksModels.Remove(task);
            await _context.SaveChangesAsync();
            return true;
        }

    }
}
