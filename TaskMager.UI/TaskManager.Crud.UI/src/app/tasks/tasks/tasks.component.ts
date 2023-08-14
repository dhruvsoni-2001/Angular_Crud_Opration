import { Component } from '@angular/core';
import { Tasks } from '../models/tasks.model';
import { TasksService } from '../service/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  tasks: Tasks[] = [];

  constructor(
    public tasksService: TasksService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.tasksService
      .getTasks()
      .subscribe((response) => (this.tasks = response));
  }

  onAddProject() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  onDeleteProject(id: number) {
    this.tasksService.deleteTask(id).subscribe(
      () => {
        console.log('Project deleted successfully.');

        // Remove the deleted project from the displayed list
        this.tasks = this.tasks.filter((task) => task.id !== id);
      },
      (error) => {
        console.error('Error deleting project:', error);
        // Handle the error, show a message, etc.
      }
    );
  }

  onUpdateTaskStatus(task: Tasks) {
    const updatedTask: Tasks = {
      ...task // Clone the task object
    };

    // Update the task status
    this.tasksService.updateTaskStatus(task.id, updatedTask)
      .subscribe(
        response => {
          console.log('Task status updated successfully.', response);
          // Handle success, show a message, etc.
        },
        error => {
          console.error('Error updating task status:', error);
          // Handle error, show a message, etc.
        }
      );
  }
}
