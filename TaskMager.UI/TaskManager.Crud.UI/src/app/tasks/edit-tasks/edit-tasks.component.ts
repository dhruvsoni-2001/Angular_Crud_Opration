import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tasks } from '../models/tasks.model';
import { TasksService } from '../service/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Project } from 'src/app/projects/Models/project.model';

@Component({
  selector: 'app-edit-tasks',
  templateUrl: './edit-tasks.component.html',
  styleUrls: ['./edit-tasks.component.css']
})
export class EditTasksComponent {
  taskForm: FormGroup;

  initialStatus: any;
  defaultTasks: Tasks = {
    id: 0,
    title: '',
    description: '',
    status: '',
    dueDate: new Date(),
    projectId: 0
  };

  tasks: Tasks = this.defaultTasks;
  projects: Project[] = [];

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: [this.initialStatus],
      dueDate: [new Date(), Validators.required],
      projectId: [null, Validators.required] // Add this line for project selection
    });
  }

  ngOnInit() {

    this.fetchProjects();

    return this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        console.log(params);

        if (id) {
          this.tasksService.getTaskById(+id).subscribe({
            next: (response) => {
              this.tasks = response;
              this.tasks.dueDate = this.tasks.dueDate;
              this.tasks.projectId = this.tasks.project!.id;
              console.log(response);
              if (this.tasks.id <= 0) {
                console.log('category id not found');
              }else {
                this.tasks.dueDate = new Date(this.tasks.dueDate);
              }
            },
          });
        }
      },
    });
  }


  

  onUpdate() {
    this.tasksService
    .updateTask(this.tasks.id, this.tasks)
    .subscribe((response) => console.log(response));
    this.router.navigate(['tasks']);
  }

  onBack() {
    this.router.navigate(['tasks']);
  }


   fetchProjects() {
    this.http.get<any[]>('https://localhost:7177/api/Project').subscribe(
      (projects) => {
        this.projects = projects;
        console.log(this.projects)
      },
      (error) => {
        console.error('Error fetching projects:', error);
        console.log('Error status:', error.status);
        console.log('Error message:', error.message);
      }
    );
  }
}
