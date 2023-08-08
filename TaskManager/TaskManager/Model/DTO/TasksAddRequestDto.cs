using System.ComponentModel.DataAnnotations;
using TaskManager.Model.Domain;

namespace TaskManager.Model.DTO
{
    public class TasksAddRequestDto
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
