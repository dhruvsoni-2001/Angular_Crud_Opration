import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Tasks } from "../models/tasks.model";

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    baseUrl = 'https://localhost:7177/api/Tasks/';
    constructor(private http: HttpClient) {}
  
    getProjects() {
      return this.http.get<Tasks[]>(this.baseUrl);
    }
  
    createProjects(tasks: Tasks) {
      return this.http.post<Tasks>(this.baseUrl, tasks);
    }
  
    getProjectById(id: number) {
      return this.http.get<Tasks>(this.baseUrl + id);
    }
  
    updateProject(id: number, tasks: Tasks) {
      return this.http.put<Tasks>(this.baseUrl + id, tasks);
    }
  
    deleteProject(id: number) {
      return this.http.delete<Tasks>(this.baseUrl + id);
    }
}