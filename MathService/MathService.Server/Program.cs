using Microsoft.EntityFrameworkCore;
using MathService.Server.Data;

namespace MathService.Server
{
    public class Program
    {
        private static bool OptUseInMemoryDb = false;

        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddDbContext<TodoContext>(ConfigureDatabaseContextOptions("Todo"));
            builder.Services.AddDbContext<SchoolContext>(ConfigureDatabaseContextOptions("School"));
            builder.Services.AddDatabaseDeveloperPageExceptionFilter();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            CreateDbIfNotExists(builder.Services);

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


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }

        private static void CreateDbIfNotExists(IServiceCollection services)
        {
            using (ServiceProvider serviceProvider = services.BuildServiceProvider())
            {
                try
                {
                    DbInitializer.Initialize(serviceProvider.GetRequiredService<SchoolContext>());
                    DbInitializer.Initialize(serviceProvider.GetRequiredService<TodoContext>());
                }
                catch (Exception ex)
                {
                    ILogger<Program> logger = serviceProvider.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred creating the database");
                }
            }
        }

        private static Action<DbContextOptionsBuilder> ConfigureDatabaseContextOptions(string dbName)
        {
            if (OptUseInMemoryDb)
            {
                return opt => opt.UseInMemoryDatabase(dbName);
            }
            else
            {
                return opt => opt.UseSqlServer(GetConnectionString(dbName));
            }
        }

        private static string GetConnectionString(string dbName)
        {
            // https://learn.microsoft.com/en-us/troubleshoot/sql/database-engine/connect/certificate-chain-not-trusted?tabs=ole-db-driver-19
            return $"Server=localhost\\SQLEXPRESS;Database={dbName};Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=true";
        }
    }
}
