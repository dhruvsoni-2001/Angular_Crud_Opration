import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Tasks } from '../models/tasks.model';
import { TasksService } from '../service/tasks.service';


@Component({
  selector: 'app-create-task',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.css'],
})
export class AddTasksComponent  implements OnInit{


  taskForm: FormGroup;
  projects: any[] = [];

  defaultTask: Tasks = {
    id: 0,
    title: '',
    description: '',
    dueDate: new Date(),
    status: '',
    projectId: 0,
  };

  task: Tasks = this.defaultTask;

  constructor(
    private taskService: TasksService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: [new Date(), Validators.required],
      status: ['', Validators.required],
      projectId: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.fetchProjects();
  }

  onSubmitReactive() {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      this.taskService.createTasks(formData).subscribe(
        (response) => {
          this.task = response;
        },
        (error) => {
          console.error('Error creating task:', error);
        }
      );
      this.router.navigate(['tasks']);
    }
  }

  onBack() {
    this.router.navigate(['tasks']);
  }

  private fetchProjects() {
    this.http.get<any[]>('https://localhost:7177/api/Project').subscribe(
      (projects) => {
        this.projects = projects;
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
}
