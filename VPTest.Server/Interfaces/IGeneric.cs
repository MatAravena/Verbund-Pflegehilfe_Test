using Microsoft.AspNetCore.Mvc;
using VPTest.Server.Model;

namespace VPTest.Server.Interfaces
{
    public interface IGeneric
    {
        Task<IEnumerable<TaskDTO>> GetAllAsync();
        Task<TaskDTO> CreateAsync(TaskDTO task);
        Task<bool> UpdateAsync(TaskDTO task);
        Task<bool> DeleteAsync(int id);
    }
}
