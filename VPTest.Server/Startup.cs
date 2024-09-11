using Microsoft.EntityFrameworkCore;
using VPTest.Server.Data;

namespace VPTest.Server
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<TasksDbContext>(options => options.UseInMemoryDatabase(databaseName: "TasksDB"));
        }
    }
}
