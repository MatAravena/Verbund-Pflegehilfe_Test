using Microsoft.AspNetCore.Mvc;
using VPTest.Server.Model;

namespace VPTest.Server.Interfaces
{
    public interface ITask
    {
        Task<IEnumerable<TaskDTO>> GetAllTasksAsync();
        Task<TaskDTO> CreateTaskAsync(TaskDTO task);
        Task<bool> UpdateTaskAsync(TaskDTO task);
        Task<bool> DeleteTaskAsync(int id);
    }
}
