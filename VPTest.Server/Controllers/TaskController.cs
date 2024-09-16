using Microsoft.AspNetCore.Mvc;
using VPTest.Server.Interfaces;

namespace VPTest.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITask _taskRepository;

        public TaskController(ITask taskRepository)
        {
            _taskRepository = taskRepository;
        }

        [HttpGet(Name = "GetTasks")]
        public async Task<IActionResult> GetTasks()
        {
            var tasks = await _taskRepository.GetAllTasksAsync();
            return Ok(tasks);
        }

        [HttpPost(Name = "AddTask")]
        public async Task<IActionResult> AddTask(TaskDTO task)
        {
            var newTasl = await _taskRepository.CreateTaskAsync(task);
            return CreatedAtAction(nameof(GetTasks), new { id = newTasl.Id }, newTasl);
        }

        [HttpPut(Name = "UpdateTask")]
        public async Task<IActionResult> UpdateTask(TaskDTO task)
        {
            var isUpdated = await _taskRepository.UpdateTaskAsync(task);
            if (!isUpdated)
                return NotFound(new { Message = "Task not found." });

            return NoContent();
        }

        [HttpDelete(Name = "DeleteTask")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var isDeleted = await _taskRepository.DeleteTaskAsync(id);
            if (!isDeleted)
                return NotFound(new { Message = "Task not found." });

            return NoContent();
        }
    }
}
