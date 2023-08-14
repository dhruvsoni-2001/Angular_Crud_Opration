import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';


import { User } from '../Models/user.model';
import { UserService } from '../service/users.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userService
      .getUsers()
      .subscribe((response) => (this.users = response));
  }

  onAddProject() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  onDeleteProject(id: number) {
    this.userService.deleteUser(id).subscribe(
      () => {
        console.log('Project deleted successfully.');

        // Remove the deleted project from the displayed list
        this.users = this.users.filter((user) => user.id !== id);
      },
      (error) => {
        console.error('Error deleting project:', error);
        // Handle the error, show a message, etc.
      }
    );
  }

  onUpdateTaskStatus(task: User) {
    const updatedTask: User = {
      ...task // Clone the task object
    };

    // Update the task status
    this.userService.updateUser(task.id, updatedTask)
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

