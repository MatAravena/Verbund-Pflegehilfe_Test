namespace VPTest.Server.Data
{
    public class TaskModel
    {
        public int Id { get; set; }
        public string? Description { get; set; }
        public DateTime? Deadline { get; set; }
        public bool IsDone { get; set; }

        public TaskModel()
        { }

        public static TaskModel createNewTask(int id, string text, DateTime deadline, bool isDone)
        {
            return new TaskModel
            {
                Id = id,
                Description = text,
                Deadline = deadline,
                IsDone = isDone,
            };
        }
    }
}


