using System.ComponentModel.DataAnnotations;
using VPTest.Server.Model;

public class TaskDTO
{
    [Required]
    public int Id { get; set; }

    [Required]
    [StringLength(100, ErrorMessage = "Description must be between 10 and 100 characters.", MinimumLength = 10)]
    public string Description { get; set; }

    [Required]
    [DataType(DataType.Date)]
    //[FutureDate(ErrorMessage = "Deadline must be a future date.")]
    public DateTime Deadline { get; set; }

    public bool IsDone { get; set; }
    
    public static IEnumerable<TaskDTO> MapToDTO(IEnumerable<TaskModel> tasks)
    {
        return tasks.Select(task => new TaskDTO
        {
            Id = task.Id,
            Description = task.Description,
            Deadline = task.Deadline,
            IsDone = task.IsDone
        }).ToList();
    }

    public class FutureDateAttribute : ValidationAttribute
    {
        public override bool IsValid(object? value)
        {
            if (value is DateTime date)
            {
                return date > DateTime.Now;
            }
            return false;
        }
    }
}
