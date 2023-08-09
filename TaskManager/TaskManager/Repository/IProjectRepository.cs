using TaskManager.Model.Domain;

namespace TaskManager.Repository
{
    public interface IProjectRepository
    {
        Task<Project?> CreateAsync(Project projectDomain);
        Task<Project?> DeleleAsync(int id);
        Task<List<Project>> GetAllAsync();
        Task<Project?> GetByIdAsync(int id);
        Task<Project?> UpdateAsysnc(Project projectDomainModel, int id);
    }
}
