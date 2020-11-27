
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {GetUsers, SetFilter} from './users.action';
import {User} from './entities/user';
import {UsersService} from './users.service';

export class UsersStateModel {
  userList: User[];
  filterBy: string;
}

function matches(user: User, term: string): boolean {
  if (user.firstName === undefined) {
     return false;
  }
  return user.firstName.toLowerCase().includes(term.toLowerCase());
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    userList: [],
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
      console.log(result);
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
}
