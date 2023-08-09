using TaskManager.Model.Domain;
using TaskManager.Model.DTO;

namespace TaskManager.Repository
{
    public interface ITaskRepository
    {
        Task<Tasks?> CreateAsync(Tasks taskDomainModel);
        Task<Tasks?> DeleleAsync(int id);
        Task<List<Tasks>> GetAllAsync();
        Task<Tasks?> GetByIdAsync(int id);
        Task<Tasks?> UpdateAsysnc(Tasks tasksDomainModel, int id);
    }
}
