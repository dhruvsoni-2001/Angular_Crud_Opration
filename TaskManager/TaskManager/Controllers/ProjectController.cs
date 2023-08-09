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
    public class ProjectController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IProjectRepository projectRepository;
        private readonly ApplicationDbContext dbContext;

        public ProjectController(IMapper mapper, IProjectRepository projectRepository, ApplicationDbContext dbContext)
        {
            this.mapper = mapper;
            this.projectRepository = projectRepository;
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var projectDomain = await projectRepository.GetAllAsync();

            return Ok(mapper.Map<List<ProjectResponseDto>>(projectDomain));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ProjectAddRequestDto projectAddRequestDto )
        {
            var projectDomain = mapper.Map<Project>(projectAddRequestDto);

            projectDomain = await projectRepository.CreateAsync(projectDomain);

            return Ok(projectDomain);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody]  ProjectUpdateRequestDto projectUpdateRequestDto)
        {
            var projectDomainModel = mapper.Map<Project>(projectUpdateRequestDto);

            projectDomainModel = await projectRepository.UpdateAsysnc(projectDomainModel, id);
            if (projectDomainModel == null)
            {
                return NotFound();
            }
            return Ok(projectDomainModel);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var projectDomain = await projectRepository.DeleleAsync(id);
            if (projectDomain == null)
            {
                return NotFound(id);
            }

            return Ok(mapper.Map<ProjectAddRequestDto>(projectDomain));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var projectDomain = await projectRepository.GetByIdAsync(id);
            if (projectDomain == null)
            {
                return NotFound();
            }
            return Ok(mapper.Map<ProjectResponseDto>(projectDomain));
        }
    }
}
