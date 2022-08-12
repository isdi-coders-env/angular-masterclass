import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

export interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

export interface UsersState {
  users: User[];
  error: string | null;
  loading: boolean;
}

export const initialState: UsersState = {
  users: [],
  error: null,
  loading: false,
};

@Component({
  selector: 'isdi-users1',
  template: `
    <ng-container>
      <div *ngIf="loading; else errorTpl">Fetching users...</div>

      <ng-template #errorTpl>
        <p *ngIf="error; else usersListTpl">
          An error occured while fetching users
        </p>
      </ng-template>

      <ng-template #usersListTpl>
        <ul *ngIf="users.length > 0">
          <li *ngFor="let user of users">
            <img [src]="user.picture.thumbnail" alt="user" />
            <p>{{ user.name.first }} {{ user.name.last }}</p>
          </li>
        </ul>
      </ng-template>
    </ng-container>
  `,
})
export class Users1Component implements OnInit {
  loading: boolean;
  users!: User[];
  error!: Error;
  constructor(public userService: UserService) {
    this.loading = true;
    this.userService.loadUsers().subscribe({
      next: ({ results }) => {
        this.users = results;
        this.loading = false;
      },
      error: (error) => (this.error = error),
    });
  }

  ngOnInit(): void {
    this.users = [];
  }
}
