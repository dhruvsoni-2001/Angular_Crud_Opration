using TaskManager.Model.Domain;

namespace TaskManager.Model.DTO
{
    public class TasksAddResponseDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public bool Status { get; set; }

        public DateTime DueDate { get; set; }

        public int ProjectId { get; set; }
    }
}
