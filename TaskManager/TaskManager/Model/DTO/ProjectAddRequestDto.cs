namespace TaskManager.Model.DTO
{
    public class ProjectAddRequestDto
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime StartDate { get; set; } = DateTime.Now;

        public DateTime EndDate { get; set; }
    }
}
