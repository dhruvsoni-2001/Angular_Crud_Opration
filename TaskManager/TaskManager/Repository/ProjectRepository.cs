using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using TaskManager.Model.Domain;

namespace TaskManager.Repository
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly ApplicationDbContext dbContext;

        public ProjectRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<Project>> GetAllAsync()
        {
            return await dbContext.projects.ToListAsync();
        }

        public async Task<Project?> CreateAsync(Project projectDomain)
        {
            await dbContext.projects.AddAsync(projectDomain);
            await dbContext.SaveChangesAsync();
            return projectDomain;
        }

        public async Task<Project?> UpdateAsysnc(Project projectDomainModel, int id)
        {
            var existingProject = await dbContext.projects.FirstOrDefaultAsync(x => x.Id == id);

            if (existingProject == null)
            {
                return null;
            }

            existingProject.Name = projectDomainModel.Name;
            existingProject.Description = projectDomainModel.Description;
            existingProject.StartDate = projectDomainModel.StartDate;
            existingProject.EndDate = projectDomainModel.EndDate;

            await dbContext.SaveChangesAsync();
            return existingProject;
        }

        public async Task<Project?> DeleleAsync(int id)
        {
            var existingProject = await dbContext.projects.FirstOrDefaultAsync(x=>x.Id == id);

            if(existingProject == null)
            {
                return null;
            }

            dbContext.projects.Remove(existingProject);
            await dbContext.SaveChangesAsync();
            return existingProject;
        }

        public async Task<Project?> GetByIdAsync(int id)
        {
            return await dbContext.projects.FirstOrDefaultAsync(x => x.Id == id);
        }
    }
}
