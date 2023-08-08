using TaskManager.Model.Domain;

namespace TaskManager.Model.DTO
{
    public class ProjectUpdateRequestDto
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime StartDate { get; set; } 

        public DateTime EndDate { get; set; }
    }
}
