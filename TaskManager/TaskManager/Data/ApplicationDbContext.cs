using Microsoft.EntityFrameworkCore;
using TaskManager.Model.Domain;

namespace TaskManager.Data
{
    public class ApplicationDbContext :DbContext 
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Project> projects { get; set; }

        public DbSet<Tasks> tasks { get; set; }

        public DbSet<User> users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var projects = new List<Project>()
            {
                new Project
                {
                    Id = 1,
                    Name = "SpendSmart",
                    Description="This is Expense Tracker which helps you to spend your money wisely",
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now,
                },
                new Project
                {
                    Id = 2,
                    Name = "FoodBuddy",
                    Description="This is Recipe app which helps you see which ingrediants are used in each recipe.",
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now,
                },
                new Project
                {
                    Id = 3,
                    Name = "PolicyBazar",
                    Description="The Policy Bazar application focus on policy of market and serches which is best for you",
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now,
                }
            };
            modelBuilder.Entity<Project>().HasData(projects);

            var tasks = new List<Tasks>()
            {
                new Tasks
                {
                    Id=1,
                    Title="Create Merge Request for your previous commit",
                    Description="Create Merge Request for your previous commit",
                    Status= true,
                    DueDate= DateTime.Today,
                    ProjectId = 1,
                },
                new Tasks
                {
                    Id=2,
                    Title="Deploy Your Code in the server",
                    Description="Deploy Your Code in the server",
                    Status= true,
                    DueDate= DateTime.Today,
                    ProjectId= 2,
                }
            };
            modelBuilder.Entity<Tasks>().HasData(tasks);

            var users = new List<User>()
            {
                new User
                {
                    Id=1,
                    Name= "Dhruv Soni",
                    Email="dhruv@gmail.com",
                    Role="Assistant Software Developer",
                    TasksId=1,
                },
                new User
                {
                    Id=2,
                    Name= "Soham Patadia",
                    Email="soham@gmail.com",
                    Role="Jr.Software Developer",
                    TasksId=2,
                },
                new User
                {
                    Id=3,
                    Name= "Parin Parikh",
                    Email="parin@gmail.com",
                    Role="Assistant Project Manager",
                    TasksId=2,
                }
            };
            modelBuilder.Entity<User>().HasData(users);
        }
    }
}
