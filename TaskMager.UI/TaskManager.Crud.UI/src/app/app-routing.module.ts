import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users/users.component';
import { TasksComponent } from './tasks/tasks/tasks.component';
import { ProjectsComponent } from './projects/projects/projects.component';
import { AddProjectsComponent } from './projects/add-projects/add-projects.component';
import { EditProjectsComponent } from './projects/edit-projects/edit-projects.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },

  { path: 'users', component: UsersComponent },

  { path: 'tasks', component: TasksComponent },

  { path: 'projects', component: ProjectsComponent },

  { path: 'projects/add', component: AddProjectsComponent},

  {path: 'projects/edit/:id', component: EditProjectsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
