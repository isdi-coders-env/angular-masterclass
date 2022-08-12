import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../home/users1/users1.component';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  loadUsers() {
    return this.http.get<UserResponse>('https://randomuser.me/api/?results=3');
  }
}

export interface UserResponse {
  results: User[];
  info: any;
}
