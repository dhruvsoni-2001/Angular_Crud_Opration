import { Component } from '@angular/core';
import { Tasks } from './tasks.model';
import { TasksService } from './tasks.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  tasks: Tasks[] = [];

  task : Tasks = {
    Id: 0,
    Title: "",
    Description: "",
    Status: "",
    DueDate: new Date(),
    ProjectId: 0
    }

  constructor(private tasksService: TasksService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.tasksService
      .getAll()
      .subscribe((response) => (this.tasks = response));
  }
}
