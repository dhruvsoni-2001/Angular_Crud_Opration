using TaskManager.Model.Domain;

namespace TaskManager.Model.DTO
{
    public class ProjectResponseDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime StartDate { get; set; } = DateTime.Now;

        public DateTime EndDate { get; set; }
    }
}
