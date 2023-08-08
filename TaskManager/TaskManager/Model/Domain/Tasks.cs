namespace TaskManager.Model.Domain
{
    public class Tasks
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public bool Status { get; set; }

        public DateTime DueDate { get; set; }

        public int ProjectId { get; set; }

        // Navigation property
        public Project Project { get; set; }
    }
}
