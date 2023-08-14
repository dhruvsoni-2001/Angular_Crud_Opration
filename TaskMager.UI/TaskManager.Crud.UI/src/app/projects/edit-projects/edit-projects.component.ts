import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../services/projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../Models/project.model';

@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.component.html',
  styleUrls: ['./edit-projects.component.css']
})
export class EditProjectsComponent implements OnInit {
  projectForm: FormGroup;
  defaultProject: Project = {
    id: 0,
    name: '',
    description: '',
    startDate: new Date(),
    endDate: new Date(),
  };

  project: Project = this.defaultProject;
  // formattedStartDate: string | undefined;
  // formattedEndDate: string | undefined;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
    });
  }

  ngOnInit() {
    return this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        console.log(params);

        if (id) {
          this.projectService.getProjectById(+id).subscribe({
            next: (response) => {
              this.project = response;
              console.log(response);
              if (this.project.id <= 0) {
                console.log('category id not found');
              }else {
                this.project.startDate = new Date(this.project.startDate);
                this.project.endDate = new Date(this.project.endDate);
              }
            },
          });
        }
      },
    });
  }


  onUpdate() {
    this.projectService
    .updateProject(this.project.id, this.project)
    .subscribe((response) => console.log(response));
    this.router.navigate(['projects']);
  }

  onBack() {
    this.router.navigate(['projects']);
  }

  private formatDate(date: Date): string {
    const year = date.getUTCFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
