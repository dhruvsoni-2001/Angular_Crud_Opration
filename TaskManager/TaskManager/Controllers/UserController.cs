using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Data;
using TaskManager.Model.Domain;
using TaskManager.Model.DTO;
using TaskManager.Repository;

namespace TaskManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;

        public UserController(ApplicationDbContext dbContext, IUserRepository regionRepository, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.userRepository = regionRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await userRepository.GetAllAsync();

            // Return DTOs
            return Ok(mapper.Map<List<UserResponseDto>>(users));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UserAddRequestDto addUserRequestDto)
        {
            var userDomain = mapper.Map<User>(addUserRequestDto);

            userDomain = await userRepository.CreateAsync(userDomain);
            var userDto = mapper.Map<UserAddUpdateResponseDto>(userDomain);
            return Ok(userDto);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UserUpdateRequestDto userUpdateRequestDto)
        {
            var userDomainModel = mapper.Map<User>(userUpdateRequestDto);

            userDomainModel = await userRepository.UpdateAsysnc(userDomainModel, id);
            var userDto = mapper.Map<UserAddUpdateResponseDto>(userDomainModel);
            if (userDomainModel == null)
            {
                return NotFound();
            }
            return Ok(userDto);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var userDomainModel = await userRepository.DeleleAsync(id);
            if (userDomainModel == null)
            {
                return NotFound(id);
            }

            return Ok(mapper.Map<UserAddUpdateResponseDto>(userDomainModel));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var userDomain = await userRepository.GetByIdAsync(id);
            if(userDomain == null)
            {
                return NotFound();
            }
            return Ok(mapper.Map<UserResponseDto>(userDomain));
        }
    }
}
