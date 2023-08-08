import { Injectable, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'https://localhost:7177/api/User';
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(this.baseUrl);
  }

  add(user: User) {
    return this.http.post<User>(this.baseUrl,user);
  }

  update(user: User) {
    return this.http.put<User>(this.baseUrl,user);
  }
  delete(id: number) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<User>(url);
  }
}
