
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {GetUserDetails, GetUsers, SetFilter, SetUserSortKey} from './users.action';
import {User} from './entities/user';
import {UsersService} from './users.service';

export class UsersStateModel {
  userList: User[];
  selectedUser: any;
  filterBy: string;
  sortDirection: SortDirection;
  sortKey: string;
}

export type SortDirection = 'asc' | 'desc';
const rotate: {[key: string]: SortDirection} = { asc: 'desc', desc: 'asc' };

function matches(user: User, term: string): boolean {
  return user.firstName.toLowerCase().includes(term.toLowerCase());
}

function sort(userList: User[], sortKey: string, sortDir: string): any {
  if (sortKey === '') {
    return userList;
  }
  userList = userList.slice();
  if (sortKey === 'id') {
    userList.sort((a, b) => a.id - b.id);
  } else {
    userList.sort((a, b) => (a[sortKey].toLowerCase() > b[sortKey].toLowerCase()) ? 1 : -1);
  }
  if (sortDir === 'desc') {
    userList.reverse();
  }
  return userList;
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    userList: [],
    selectedUser: null,
    sortDirection: 'asc',
    sortKey: '',
    filterBy: ''
  }
})

@Injectable()
export class UsersState {

  constructor(private usersService: UsersService) {}

  @Selector()
  static userList(state: UsersStateModel): any {
    console.log(state);
    return sort(state.userList, state.sortKey, state.sortDirection).filter(resort => matches(resort, state.filterBy));
  }

  @Selector()
  static userFilterBy(state: UsersStateModel): any {
    return state.filterBy;
  }

  @Selector()
  static selectedUser(state: UsersStateModel): any {
    return state.selectedUser;
  }
  // Gets all users from DB
  @Action(GetUsers)
  getUsers(ctx: StateContext<UsersStateModel>): any {
    return this.usersService.getUsers().then((result) => {
      ctx.patchState({
          userList: result
        });
      }
    );
  }

  @Action(GetUserDetails)
  getUserDetails(ctx: StateContext<UsersStateModel>, {id}: GetUserDetails): any {
    return this.usersService.getUserDetails(id).then((result) => {
        ctx.patchState({
          selectedUser: result
        });
      }
    );
  }

  @Action(SetFilter)
  setFilter(ctx: StateContext<UsersStateModel>, payload: SetFilter): any {
    ctx.patchState({
      filterBy: payload.str
    });
  }

  @Action(SetUserSortKey)
  setUserSortKey(ctx: StateContext<UsersStateModel>, {str}: SetUserSortKey): any {
    console.log(str);
    ctx.patchState({
      sortKey: str,
      sortDirection: rotate[ctx.getState().sortDirection]
    });
  }
}
