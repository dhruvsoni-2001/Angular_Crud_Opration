using Microsoft.Data.SqlClient.DataClassification;

namespace TaskManager.Model.Domain
{
    public class User
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Role { get; set; }

        public int TasksId { get; set; }
        // Navigation Propeerty
        public Tasks Tasks { get; set; }
    }
}
