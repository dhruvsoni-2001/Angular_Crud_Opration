import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Project } from "./project.model";

@Injectable({
    providedIn: 'root',
  })
export class ProjectService{

    baseUrl = 'https://localhost:7177/api/Project';
    constructor(private http: HttpClient) {}
    
    getAll() {
        return this.http.get<Project[]>(this.baseUrl);
    }
}