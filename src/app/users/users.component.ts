import { Component } from '@angular/core';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  private _users: User[] = [];
  constructor() {
    this.callUsers();
  }

  get users() {
    return [...this._users];
  }

  callUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => {
        this._users = json;
        console.log(this._users);
      });
  }
}
