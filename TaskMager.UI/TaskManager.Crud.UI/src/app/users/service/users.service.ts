import { Injectable, forwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user.model';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'https://localhost:7177/api/User/';
  constructor(private http: HttpClient) {}
  
  getUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }

  createUser(tasks: User) {
    return this.http.post<User>(this.baseUrl, tasks);
  }

  getUserById(id: number) {
    return this.http.get<User>(this.baseUrl + id);
  }

  updateUser(id: number, tasks: User) {
    return this.http.put<User>(this.baseUrl + id, tasks);
  }

  deleteUser(id: number) {
    return this.http.delete<User>(this.baseUrl + id);
  }

  // updateTaskStatus(id : number, tasks: User){
  //   return this.http.put<User>(this.baseUrl + `${id}/status`, tasks);
  // }
}
