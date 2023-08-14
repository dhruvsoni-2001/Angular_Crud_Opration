import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Tasks } from "../models/tasks.model";

@Injectable({
    providedIn: 'root',
})
export class TasksService {
    baseUrl = 'https://localhost:7177/api/Task/';
    constructor(private http: HttpClient) {}
  
    getTasks() {
      return this.http.get<Tasks[]>(this.baseUrl);
    }
  
    createTasks(tasks: Tasks) {
      return this.http.post<Tasks>(this.baseUrl, tasks);
    }
  
    getTaskById(id: number) {
      return this.http.get<Tasks>(this.baseUrl + id);
    }
  
    updateTask(id: number, tasks: Tasks) {
      return this.http.put<Tasks>(this.baseUrl + id, tasks);
    }
  
    deleteTask(id: number) {
      return this.http.delete<Tasks>(this.baseUrl + id);
    }

    updateTaskStatus(id : number, tasks: Tasks){
      return this.http.put<Tasks>(this.baseUrl + `${id}/status`, tasks);
    }
}