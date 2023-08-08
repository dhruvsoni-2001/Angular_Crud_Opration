using System.ComponentModel.DataAnnotations;

namespace TaskManager.Model.DTO
{
    public class TasksUpdateRequestDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        public bool Status { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public int ProjectId { get; set; }
    }
}
