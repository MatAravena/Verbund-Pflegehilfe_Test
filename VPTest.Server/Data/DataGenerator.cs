using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace VPTest.Server.Data
{
    public class DataGenerator
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using var context = new TasksDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<TasksDbContext>>());

            //any context already exist
            if (context.TasksModels.Any())
                return;

            context.TasksModels.AddRange(
                TaskModel.createNewTask(1, "Interview with Gloria", new DateTime(DateTime.Now.Year, DateTime.Now.Month - 1, DateTime.Now.Day - 5), true),
                TaskModel.createNewTask(2, "Finish Coding test", new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day - 1), false),
                TaskModel.createNewTask(3, "Compare ML/AI LGBMR with LSTM", new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day + 5), false),
                TaskModel.createNewTask(4, "Analize predicted data", new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day + 10), false),
                TaskModel.createNewTask(5, "Try to play with the first automated trading", new DateTime(DateTime.Now.Year, DateTime.Now.Month + 1, DateTime.Now.Day + 5), false) );
            context.SaveChanges();
        }
    }
}