import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { DUMMY_USERS } from '../utils/dummy-users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users: User[] = DUMMY_USERS;
  private user!: User;

  constructor() {}

  get allUsers() {
    return this.users.slice();
  }

  get currentUser() {
    return this.user;
  }

  set currentUser(user: User) {
    this.user = user;
  }
}
