import {Injectable} from '@angular/core';
import 'rxjs/Rx';

@Injectable()

export class UserService {

  constructor() {
  }

  users = [
    {
      _id: '123',
      email: 'alice@wonderland.com',
      username: 'alice',
      password: 'alice',
      firstName: 'Alice',
      lastName: 'Wonder'
    },
    {
      _id: '234',
      email: 'bob@marley.com',
      username: 'bob',
      password: 'bob',
      firstName: 'Bob',
      lastName: 'Marley'
    },
    {
      _id: '345',
      email: 'charly@Garcia.com',
      username: 'charly',
      password: 'charly',
      firstName: 'Charly',
      lastName: 'Garcia'
    },
    {
      _id: '456',
      email: 'jose@annunzi.com',
      username: 'jannunzi',
      password: 'jannunzi',
      firstName: 'Jose',
      lastName: 'Annunzi'
    }
  ];

  api = {
    'createUser': this.createUser,
    'findUserById': this.findUserById,
    'findUserByUsername': this.findUserByUsername,
    'findUserByCredentials': this.findUserByCredentials,
    'updateUser': this.updateUser,
    'deleteUser': this.deleteUser
  };

  createUser(user: any) {
    user._id = Math.random().toString();
    this.users.push(user);
    return user;
  }

  findUserById(userId: string) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        return this.users[x];
      }
    }
  }

  findUserByUsername(username: string) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x].username === username) {
        return this.users[x];
      }
    }
  }

  findUserByCredentials(username: string, password: string) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x].username === username && this.users[x].password === password) {
        return this.users[x];
      }
    }
  }

  updateUser(userId: string, user: any) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        this.users[x] = user;
      }
    }
  }

  deleteUser(userId: string) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        this.users.splice(x, 1);
      }
    }
  }
}
