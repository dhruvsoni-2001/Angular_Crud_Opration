import { Component, OnInit } from '@angular/core';
import { Project } from './project.model';
import { ProjectService } from './projects.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];

  project: Project = {
    id: 0,
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date()
    }

  constructor(private projectService: ProjectService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.projectService
      .getAll()
      .subscribe((response) => (this.projects = response));
  }
}
