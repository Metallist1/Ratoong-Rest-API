import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {UsersState} from '../../shared/states/users/users.state';
import {Observable} from 'rxjs';
import {User} from '../../shared/states/users/entities/user';
import {GetUsers, SetFilter} from '../../shared/states/users/users.action';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  @Select(UsersState.userList) currentUsers: Observable<User[]>;
  users = [];
  usersPage = [];

  page = 1;
  pageSize = 4;

  constructor(private store: Store) {
    this.currentUsers.subscribe(data => {
      this.users = [];
      data.forEach((value) => {
        this.users.push(value);
      });
      this.refreshUsers();
    });
  }

  refreshUsers(): void {
    this.usersPage = this.users
      .map((user, i) => ({id: i + 1, ...user}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }


  ngOnInit(): void {
    this.store.dispatch(new GetUsers());
  }

  updateFilter(str): void {
    this.store.dispatch(new SetFilter(str));
  }
}
