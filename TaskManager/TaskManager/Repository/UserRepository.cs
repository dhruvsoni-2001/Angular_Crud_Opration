using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using TaskManager.Model.Domain;

namespace TaskManager.Repository
{
    public class UserRepository : IUserRepository
    {

        private readonly ApplicationDbContext dbContext;

        public UserRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await dbContext.users.Include(z=>z.Tasks).Include(x=>x.Tasks.Project).ToListAsync();
        }

        public async Task<User?> CreateAsync(User userDomain)
        {
            await dbContext.users.AddAsync(userDomain);
            await dbContext.SaveChangesAsync();
            return userDomain;
        }

        public async Task<User?> UpdateAsysnc(int id, User userDomainModel)
        {
            var existingUser = await dbContext.users.FirstOrDefaultAsync(x => x.Id == id);
            if (existingUser == null)
            {
                return null;
            }

            existingUser.Name = userDomainModel.Name;
            existingUser.Email = userDomainModel.Email;
            existingUser.Role = userDomainModel.Role;
            existingUser.TasksId = userDomainModel.TasksId;
            //existingUser.ProjectId = userDomainModel.ProjectId;
            await dbContext.SaveChangesAsync();
            return existingUser;
        }

        public async Task<User?> DeleleAsync(int id)
        {
            var existingUsers = await dbContext.users.FirstOrDefaultAsync(x => x.Id == id);

            if (existingUsers == null)
            {
                return null;
            }

            dbContext.users.Remove(existingUsers);
            await dbContext.SaveChangesAsync();
            return existingUsers;
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await dbContext.users.Include(z => z.Tasks).Include(x => x.Tasks.Project).FirstOrDefaultAsync(x=> x.Id == id);
        }
    }
}
