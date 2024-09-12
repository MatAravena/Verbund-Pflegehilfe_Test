using VPTest.Server.Data;

namespace VPTest.Server.Interfaces
{
    public interface ITaskRepository
    {
        Task<IEnumerable<TaskModel>> GetTasks();
        Task<TaskModel> AddTask(TaskModel task);
        Task<bool> UpdateTask(TaskModel task);
        Task<bool> DeleteTask(int id);
    }
}
