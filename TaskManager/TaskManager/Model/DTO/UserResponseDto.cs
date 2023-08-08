using System.ComponentModel.DataAnnotations;
using TaskManager.Model.Domain;

namespace TaskManager.Model.DTO
{
    public class UserResponseDto
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        public string Role { get; set; }

        //[Required]
        //public int TasksId { get; set; }

        [Required]
        public Tasks Tasks { get; set; }
    }
}
