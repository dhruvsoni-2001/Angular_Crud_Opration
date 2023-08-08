import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./users/users.component";
import { TasksComponent } from "./tasks/tasks.component";
import { ProjectsComponent } from "./projects/projects.component";
const appRoutes: Routes = [
    { path: '', redirectTo: 'user', pathMatch: 'full' },

    { path: 'users', component: UsersComponent },
  
    { path: 'tasks', component: TasksComponent },
  
    { path: 'projects', component: ProjectsComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
