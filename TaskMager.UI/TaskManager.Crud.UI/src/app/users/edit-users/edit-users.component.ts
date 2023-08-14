import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user.model';
import { UserService } from '../service/users.service';
import { Project } from 'src/app/projects/Models/project.model';
import { Tasks } from 'src/app/tasks/models/tasks.model';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css'],
})
export class EditUsersComponent {
  userForm: FormGroup;

  initialStatus: any;
  defaultUser: User = {
    id: 0,
    name: '',
    email: '',
    role: '',
    tasksId: 0,
    tasks: {
      id: 0,
      title: '',
      description: '',
      status: '',
      dueDate: new Date(),
      projectId: 0,
      project: {
        id: 0,
        name: '',
        description: '',
        startDate: new Date(),
        endDate: new Date(),
      }
  }
};

  user: User = this.defaultUser;
  projects: Project[] = [];
  tasks: Tasks[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
      tasksId: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.fetchTask();
  
    return this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        console.log(params);
  
        if (id) {
          this.userService.getUserById(+id).subscribe({
            next: (response) => {
              this.user = response;
              this.user.tasksId = this.user.tasks.id;  // Corrected line
              console.log(response);
            },
          });
        }
      },
    });
  }
  

  onUpdate() {
    this.userService
      .updateUser(this.user.id, this.user)
      .subscribe((response) => console.log(response));
    this.router.navigate(['users']);
  }

  onBack() {
    this.router.navigate(['users']);
  }

  fetchTask() {
    this.http.get<any[]>('https://localhost:7177/api/Task/').subscribe(
      (tasks) => {
        this.tasks = tasks;
        console.log(this.tasks);
      },
      (error) => {
        console.error('Error fetching projects:', error);
        console.log('Error status:', error.status);
        console.log('Error message:', error.message);
      }
    );
  }
  // fetchProjects() {
  //   this.http.get<any[]>('https://localhost:7177/api/Project').subscribe(
  //     (projects) => {
  //       this.projects = projects;
  //       console.log(this.projects);
  //     },
  //     (error) => {
  //       console.error('Error fetching projects:', error);
  //       console.log('Error status:', error.status);
  //       console.log('Error message:', error.message);
  //     }
  //   );
  // }
}
