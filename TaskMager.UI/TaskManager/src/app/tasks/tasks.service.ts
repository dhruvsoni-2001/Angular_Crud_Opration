import { Injectable, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tasks } from './tasks.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  baseUrl = 'https://localhost:7177/api/Task';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Tasks[]>(this.baseUrl);
  }
}
