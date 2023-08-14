using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using TaskManager.Model.Domain;
using TaskManager.Model.DTO;

namespace TaskManager.Repository
{
    public class TaskRepository : ITaskRepository
    {
        private readonly ApplicationDbContext dbContext;

        public TaskRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<Tasks>> GetAllAsync()
        {
            return await dbContext.tasks.Include(x=> x.Project).ToListAsync();
        }

        public async Task<Tasks?> CreateAsync(Tasks taskDomainModel)
        {
            await dbContext.tasks.AddAsync(taskDomainModel);
            await dbContext.SaveChangesAsync();
            return taskDomainModel;
        }

        public async Task<Tasks?> UpdateAsysnc(Tasks tasksDomainModel, int id)
        {
            var existingTasks = await dbContext.tasks.FirstOrDefaultAsync(x => x.Id == id);
            if (existingTasks == null)
            {
                return null;
            }

            existingTasks.Title = tasksDomainModel.Title;
            existingTasks.Description = tasksDomainModel.Description;
            existingTasks.Status = tasksDomainModel.Status;
            existingTasks.DueDate = tasksDomainModel.DueDate;
            existingTasks.ProjectId = tasksDomainModel.ProjectId;

            await dbContext.SaveChangesAsync();
            return existingTasks;
        }

        public async Task<Tasks?> DeleleAsync(int id)
        {
            var existingTasks = await dbContext.tasks.FirstOrDefaultAsync(x => x.Id == id);

            if (existingTasks == null)
            {
                return null;
            }

            dbContext.tasks.Remove(existingTasks);
            await dbContext.SaveChangesAsync();
            return existingTasks;
        }

        public async Task<Tasks?> GetByIdAsync(int id)
        {
            return await dbContext.tasks.Include(z => z.Project).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Tasks> UpdateStatusAsysnc(Tasks tasksDomain, int id)
        {
            var existingTasks = await dbContext.tasks.FirstOrDefaultAsync(x => x.Id == id);
            if (existingTasks == null)
            {
                return null;
            }
            existingTasks.Status = tasksDomain.Status;
            await dbContext.SaveChangesAsync();
            return existingTasks;
        }
    }
}
