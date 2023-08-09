import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../services/projects.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Project } from '../Models/project.model';

@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.component.html',
  styleUrls: ['./edit-projects.component.css']
})
export class EditProjectsComponent implements OnInit {
  projectForm: FormGroup;
  projects: Project ={
    id:0,
    name:'',
    description:'',
    startDate: new Date,
    endDate: new Date,
  }
  
  constructor(
    private projectService: ProjectService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.projectForm.valid) {
      const formData = this.projectForm.value;
      this.projectService.createProjects(formData).subscribe(
        (response: any) => {
          this.router.navigate(['projects']);
        },
        (error) => {
          console.error('Error creating product:', error);
        }
      );
    }
  }
  onBack() {
    this.router.navigate(['projects']);
  }
}