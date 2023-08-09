import { Component } from '@angular/core';
import { Project } from '../Models/project.model';
import { ProjectService } from '../services/projects.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects: Project[] = [];

  constructor(
    public projectService: ProjectService, 
    private router: Router, 
    private route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.projectService
        .getProjects()
        .subscribe((response) => (this.projects = response));
    }
  
    onAddProject() {
      this.router.navigate(['add'], { relativeTo: this.route });
    }

    onEditProject(){
      this.router.navigate(['edit'], { relativeTo: this.route });
    }

    onDeleteProject(id: number) {
      this.projectService.deleteProject(id).subscribe(
        () => {
          console.log('Project deleted successfully.');
          
          // Remove the deleted project from the displayed list
          this.projects = this.projects.filter(project => project.id !== id);
        },
        (error) => {
          console.error('Error deleting project:', error);
          // Handle the error, show a message, etc.
        }
      );
    }
  }