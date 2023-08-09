import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from './users.service';
import { User } from './user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  userDialogVisible: boolean = false;
  userDialogSubmitted: boolean = false;
  selectedUser!: User | null;
  newUser: User = {
    id: 0,
    name: '',
    email: '',
    role: '',
    taskId: 0,
  };
  

  taskIds: number[] = []; // Array to hold the unique task IDs
  taskOptions: any[] = [];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAll().subscribe((response) => {
      this.users = response;

      // Extract unique task IDs from the users array and load them into the taskIds array
      this.taskIds = [...new Set(this.users.map((user) => user.taskId))];
      
    });
  }


  showDialog() {
    this.newUser = {
      id: 0,
      name: '',
      email: '',
      role: '',
      taskId: 0,
    };
    this.userDialogVisible = true;
    this.userDialogSubmitted = false;
  }

  editUser(user: User) {
    this.selectedUser = { ...user };
    this.newUser = { ...user }; // Populate the newUser object with the selected user's data
    this.userDialogVisible = true;
    this.userDialogSubmitted = false;
  }

  deleteUser(user: User) {
    this.userService.delete(user.id).subscribe(
      () => {
        console.log('User deleted successfully.');
        // Remove the deleted user from the users array
        this.users = this.users.filter((u) => u.id !== user.id);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  hideUserDialog() {
    this.userDialogVisible = false;
  }

  onSaveUser(user: User) {
    if (user.id === 0) {
      // Add new user
      this.userService.add(user).subscribe(
        (response) => {
          console.log('User added successfully:', response);
          this.loadUsers(); // Reload users after adding to refresh taskIds
        },
        (error) => {
          console.error('Error adding user:', error);
        }
      );
    } else {
      // Update existing user
      this.userService.update(user).subscribe(
        (response) => {
          console.log('User updated successfully:', response);
          this.loadUsers(); // Reload users after updating to refresh taskIds
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }

    this.hideUserDialog();
  }

  onCancelUser() {
    this.hideUserDialog();
    this.loadUsers(); //
  }
}
