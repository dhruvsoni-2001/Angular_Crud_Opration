import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from './user.model';
import { UserService } from './users.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
  

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  defaultUser: User = {
    id: 0,
    name: "",
    email: "",
    role: "",
    taskId: 0,

    }

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userService
      .getAll()
      .subscribe((response) => (this.users = response));
  }

  onAdd() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  onEdit(user: User) {
    // Assuming you have a route for editing a user, navigate to it with the user ID as a parameter
    this.router.navigate(['edit', user.id], { relativeTo: this.route });
  }

  onDelete(id: number) {
    this.userService.delete(id).subscribe(
      () => {
        console.log('User deleted successfully.');
        // Remove the deleted user from the users array
        this.users = this.users.filter((user) => user.id !== id);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}