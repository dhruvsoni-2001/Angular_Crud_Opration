import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/users.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
  userForm: FormGroup;
  tasks: any[] = [];
  projects: any[] = [];
  initialStatus: any;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      tasksId: ['', Validators.required]
      // projectId: [null, Validators.required] // Remove this line
    });

    // Fetch projects when the component is constructed
    this.fetchTasks();
    this.fetchProjects();
  }

  ngOnInit() {
    // This method should be implemented without throwing an error.
    // Any initialization logic you want to perform for this component
    // should go here.
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.userService.createUser(formData).subscribe(
        (response: any) => {
          this.router.navigate(['users']);
        },
        (error) => {
          console.error('Error creating user:', error);
        }
      );
    }
  }

  onBack() {
    this.router.navigate(['users']);
  }

  private fetchTasks(){
    this.http.get<any[]>('https://localhost:7177/api/Task/').subscribe(
      (tasks)=>{
        this.tasks = tasks;
      },
      (error)=>{
        console.error('Error fetching tasks', error);
        console.log('Error status:', error.status);
        console.log('Error message:', error.message);
      }
    );
  }
  
  private fetchProjects() {
    this.http.get<any[]>('https://localhost:7177/api/Project').subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error fetching projects:', error);
        console.log('Error status:', error.status);
        console.log('Error message:', error.message);
      }
    );
  }
}
