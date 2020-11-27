
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {CreateAccount, LoginAdmin, Logout} from './admin-auth.action';
import {AdminAuthService} from './admin-auth.service';
import {AdminsUsers} from './entities/AdminUser';

export class AdminAuthStateModel {
  adminUser: AdminsUsers;
}

@State<AdminAuthStateModel>({
  name: 'AdminAuth',
  defaults: {
    adminUser: undefined
  }
})
@Injectable()
export class AdminAuthState {

  constructor(private authService: AdminAuthService) {}

  @Selector()
  static getAdminAuth(state: AdminAuthStateModel): any {
    return state.adminUser;
  }

  @Action(LoginAdmin)
  loginAdmin({getState, setState}: StateContext<AdminAuthStateModel>, {username, password}: LoginAdmin): any {
    return this.authService.loginWithEmail(username, password).then((result) => {
        const state = getState();
        setState({
          ...state,
          adminUser: result,
        });
      }
    );
  }
  @Action(CreateAccount)
  createAccount({getState, setState}: StateContext<AdminAuthStateModel>, {username, password}: CreateAccount): any {
    return this.authService.createNewUser(username, password).then((result) => {
        const state = getState();
        setState({
          ...state,
          adminUser: result,
        });
      }
    );
  }

  @Action(Logout)
  logout({getState, setState}: StateContext<AdminAuthStateModel>): any {
    return this.authService.logout().then((result) => {
        const state = getState();
        setState({
          ...state,
          adminUser: undefined,
        });
      }
    ).catch(error => {
      throw new Error(error.message);
    });
  }
}
