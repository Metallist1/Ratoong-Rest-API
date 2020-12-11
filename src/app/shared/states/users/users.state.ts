
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {GetUsers, SetFilter, SortUsers} from './users.action';
import {User} from './entities/user';
import {UsersService} from './users.service';

export class UsersStateModel {
  userList: User[];
  filterBy: string;
  sortDirection: SortDirection;
}

export type SortDirection = 'asc' | 'desc';
const rotate: {[key: string]: SortDirection} = { asc: 'desc', desc: 'asc' };

function matches(user: User, term: string): boolean {
  return user.firstName.toLowerCase().includes(term.toLowerCase());
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    userList: [],
    sortDirection: 'asc',
    filterBy: ''
  }
})

@Injectable()
export class UsersState {

  constructor(private usersService: UsersService) {}

  @Selector()
  static userList(state: UsersStateModel): any {
    return state.userList.filter(resort => matches(resort, state.filterBy));
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

  @Action(SetFilter)
  setFilter(ctx: StateContext<UsersStateModel>, payload: SetFilter): any {
    ctx.patchState({
      filterBy: payload.str
    });
  }

  @Action(SortUsers)
  sortUsers(ctx: StateContext<UsersStateModel>, payload: SortUsers): any {
    const state = ctx.getState();
    const sortedList = state.userList.slice();
    if (payload.str === 'id'){
      sortedList.sort((a, b) => a.id - b.id);
    }
    else{
      sortedList.sort((a, b) => (a[payload.str].toLowerCase() > b[payload.str].toLowerCase()) ? 1 : -1);
    }
    if (state.sortDirection === 'desc'){
      sortedList.reverse();
    }
    console.log(sortedList);
    ctx.patchState({
      userList: sortedList,
      sortDirection: rotate[state.sortDirection]
    });
  }
}
