using System.ComponentModel.DataAnnotations;

namespace TaskManager.Model.DTO
{
    public class UserAddRequestDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        public string Role { get; set; }

        [Required]
        public int TasksId { get; set; }
    }
}
