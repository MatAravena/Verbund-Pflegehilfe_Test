using VPTest.Server;
using VPTest.Server.Model;

namespace VPTesting
{
    public class TestTaskModel
    {
        [Fact]
        public void CreateNewTaskModel()
        {
            var result = TaskModel.createNewTask(0, "Completed task", DateTime.Now.AddDays(-1), false);
            Assert.IsType<TaskModel>(result);
        }

        [Fact]
        public void CreateNewTaskModel_DoneIsTrue()
        {
            var result = TaskModel.createNewTask(0, "Completed task", DateTime.Now.AddDays(-1), false);
            Assert.False(result.IsDone); 
        }
    }
}