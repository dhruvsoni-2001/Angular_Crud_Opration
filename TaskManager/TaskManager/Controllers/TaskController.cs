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
    public class TaskController : ControllerBase
    {

        private readonly ApplicationDbContext dbContext;
        private readonly ITaskRepository taskRepository;
        private readonly IMapper mapper;

        public TaskController(ApplicationDbContext dbContext, ITaskRepository taskRepository, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.taskRepository = taskRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var taskDomain = await taskRepository.GetAllAsync();

            return Ok(mapper.Map<List<TasksResponseDto>>(taskDomain));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TasksAddRequestDto addTasksRequestDto)
        {
            var taskDomainModel = mapper.Map<Tasks>(addTasksRequestDto);

            taskDomainModel = await taskRepository.CreateAsync(taskDomainModel);
            var taskDto = mapper.Map<TasksAddResponseDto>(taskDomainModel);
            return Ok(taskDto);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] TasksUpdateRequestDto tasksUpdateRequestDto)
        {
            var tasksDomainModel = mapper.Map<Tasks>(tasksUpdateRequestDto);

            tasksDomainModel = await taskRepository.UpdateAsysnc(tasksDomainModel, id);
            var tasksDto = mapper.Map<TasksAddResponseDto>(tasksDomainModel);
            if (tasksDomainModel == null)
            {
                return NotFound();
            }
            return Ok(tasksDto);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var tasksDomain = await taskRepository.DeleleAsync(id);
            if (tasksDomain == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<TasksAddRequestDto>(tasksDomain));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var projectDomain = await taskRepository.GetByIdAsync(id);
            if (projectDomain == null)
            {
                return NotFound();
            }
            return Ok(mapper.Map<TasksResponseDto>(projectDomain));
        }
    }
}
