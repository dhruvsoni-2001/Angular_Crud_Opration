using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TaskManager.Migrations
{
    /// <inheritdoc />
    public partial class DataAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_projects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "tasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProjectId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tasks_projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TasksId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_users_tasks_TasksId",
                        column: x => x.TasksId,
                        principalTable: "tasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "projects",
                columns: new[] { "Id", "Description", "EndDate", "Name", "StartDate" },
                values: new object[,]
                {
                    { 1, "This is Expense Tracker which helps you to spend your money wisely", new DateTime(2023, 7, 27, 15, 9, 1, 375, DateTimeKind.Local).AddTicks(6625), "SpendSmart", new DateTime(2023, 7, 27, 15, 9, 1, 375, DateTimeKind.Local).AddTicks(6624) },
                    { 2, "This is Recipe app which helps you see which ingrediants are used in each recipe.", new DateTime(2023, 7, 27, 15, 9, 1, 375, DateTimeKind.Local).AddTicks(6632), "FoodBuddy", new DateTime(2023, 7, 27, 15, 9, 1, 375, DateTimeKind.Local).AddTicks(6631) },
                    { 3, "The Policy Bazar application focus on policy of market and serches which is best for you", new DateTime(2023, 7, 27, 15, 9, 1, 375, DateTimeKind.Local).AddTicks(6634), "PolicyBazar", new DateTime(2023, 7, 27, 15, 9, 1, 375, DateTimeKind.Local).AddTicks(6633) }
                });

            migrationBuilder.InsertData(
                table: "tasks",
                columns: new[] { "Id", "Description", "DueDate", "ProjectId", "Status", "Title" },
                values: new object[,]
                {
                    { 1, "Create Merge Request for your previous commit", new DateTime(2023, 7, 27, 0, 0, 0, 0, DateTimeKind.Local), 1, true, "Create Merge Request for your previous commit" },
                    { 2, "Deploy Your Code in the server", new DateTime(2023, 7, 27, 0, 0, 0, 0, DateTimeKind.Local), 2, true, "Deploy Your Code in the server" }
                });

            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "Id", "Email", "Name", "Role", "TasksId" },
                values: new object[,]
                {
                    { 1, "dhruv@gmail.com", "Dhruv Soni", "Assistant Software Developer", 1 },
                    { 2, "soham@gmail.com", "Soham Patadia", "Jr.Software Developer", 2 },
                    { 3, "parin@gmail.com", "Parin Parikh", "Assistant Project Manager", 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_tasks_ProjectId",
                table: "tasks",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_users_TasksId",
                table: "users",
                column: "TasksId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "tasks");

            migrationBuilder.DropTable(
                name: "projects");
        }
    }
}
