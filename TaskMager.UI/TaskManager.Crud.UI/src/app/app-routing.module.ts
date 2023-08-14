import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users/users.component';
import { TasksComponent } from './tasks/tasks/tasks.component';
import { ProjectsComponent } from './projects/projects/projects.component';
import { AddProjectsComponent } from './projects/add-projects/add-projects.component';
import { EditProjectsComponent } from './projects/edit-projects/edit-projects.component';
import { AddTasksComponent } from './tasks/add-tasks/add-tasks.component';
import { EditTasksComponent } from './tasks/edit-tasks/edit-tasks.component';
import { AddUsersComponent } from './users/add-users/add-users.component';
import { EditUsersComponent } from './users/edit-users/edit-users.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },

  { path: 'users', component: UsersComponent },
  { path: 'users/add', component: AddUsersComponent},
  { path: 'users/edit/:id', component: EditUsersComponent},

  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/add', component: AddTasksComponent},
  { path: 'tasks/edit/:id', component: EditTasksComponent},

  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/add', component: AddProjectsComponent},
  {path: 'projects/edit/:id', component: EditProjectsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
