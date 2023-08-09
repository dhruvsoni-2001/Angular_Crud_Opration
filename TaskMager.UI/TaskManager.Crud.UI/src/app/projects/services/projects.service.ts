import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Project } from "../Models/project.model";

@Injectable({
    providedIn: 'root',
})
export class ProjectService{
    baseUrl = 'https://localhost:7177/api/Project';
    constructor(private http: HttpClient) {}
  
    getCategories() {
      return this.http.get<Project[]>(this.baseUrl);
    }
  
    createCategory(project: Project) {
      return this.http.post<Project>(this.baseUrl, project);
    }
  
    getCategoryById(id: number) {
      return this.http.get<Project>(this.baseUrl + id);
    }
  
    updateCategory(id: number, project: Project) {
      return this.http.put<Project>(this.baseUrl + id, project);
    }
  
    deleteCategory(id: number) {
      return this.http.delete<Project>(this.baseUrl + id);
    }
}