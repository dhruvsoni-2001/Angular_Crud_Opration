using System.ComponentModel.DataAnnotations;

namespace TaskManager.Model.DTO
{
    public class UserUpdateRequestDto
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        public string Role { get; set; }

        public int TasksId { get; set; }
    }
}
