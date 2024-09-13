using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure.Internal;
using Microsoft.Extensions.DependencyInjection;
using VPTest.Server.Data;
using VPTest.Server.Implementation;
using VPTest.Server.Interfaces; 

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Adding Db Context
// builder.Services.AddDbContext<TasksDbContext>();
// Generating basic data
// DataGenerator.Initialize(app.Services.CreateScope().ServiceProvider);



// Adding Db Context with In-Memory Database
builder.Services.AddDbContext<TasksDbContext>(options => options.UseInMemoryDatabase("TasksDb"));

//Allowing cors
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
            //.AllowCredentials()
            ;
    });
    options.AddPolicy(name: MyAllowSpecificOrigins,
                        builder =>
                        {
                            builder.WithOrigins("localhost:5173",
                                                "https://localhost/",
                                                "https://localhost:5173/",
                                                "https://localhost:5173/");
                        });
});

// Other service registrations
builder.Services.AddScoped<ITaskRepository, TaskRepository>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.UseCors();
app.UseCors(MyAllowSpecificOrigins);

app.MapControllers();
app.MapFallbackToFile("/index.html");

// Generating basic data
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    DataGenerator.Initialize(services);  // Assuming DataGenerator initializes your test data
}

app.Run();
