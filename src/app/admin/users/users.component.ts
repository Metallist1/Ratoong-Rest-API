import {Component, OnDestroy, OnInit} from '@angular/core';
import {Actions, ofActionSuccessful, Select, Store} from '@ngxs/store';
import {UsersState} from '../../shared/states/users/users.state';
import {Observable, Subject} from 'rxjs';
import {User} from '../../shared/states/users/entities/user';
import {GetUserDetails, GetUsers, SetFilter, SortUsers} from '../../shared/states/users/users.action';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit, OnDestroy {

  isLoading = true;
  private ngUnsubscribe = new Subject();


  @Select(UsersState.userList) currentUsers: Observable<User[]>;
  users = [];
  usersPage = [];

  page = 1;
  pageSize = 4;

  constructor(private store: Store, private actions$: Actions) {

    this.actions$.pipe(ofActionSuccessful(GetUsers),
      takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.isLoading = false;
    });

    this.actions$.pipe(ofActionSuccessful(SetFilter),
      takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.isLoading = false;
    });

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
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnInit(): void {
    this.store.dispatch(new GetUsers());
  }

  ngOnDestroy(): any{
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  updateFilter(str): void {
    this.store.dispatch(new SetFilter(str));
  }

  onSort(str): void {
    this.store.dispatch(new SortUsers(str));
  }

  selectUser(id): void {
    console.log(id);
    this.store.dispatch(new GetUserDetails(id));
  }
}
