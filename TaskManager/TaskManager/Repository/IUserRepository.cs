using TaskManager.Model.Domain;

namespace TaskManager.Repository
{
    public interface IUserRepository
    {
        Task<User?> CreateAsync(User userDomainModel);
        Task<List<User>> GetAllAsync();
        Task<User?> GetByIdAsync(int id);
        Task<User?> UpdateAsysnc(User userDomainModel, int id);
        Task<User?> DeleleAsync(int id);
    }
}
