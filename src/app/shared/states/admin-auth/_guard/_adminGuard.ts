import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Select} from '@ngxs/store';
import {AdminsUsers} from '../entities/AdminUser';
import {AdminAuthState} from '../admin-auth.state';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  @Select(AdminAuthState.getAdminAuth) currentUser: Observable<AdminsUsers>;
  currentU: AdminsUsers;
  constructor( private router: Router) {
    this.currentUser.subscribe(
      (data) => {
        this.currentU = data;
      });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true|UrlTree {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true|UrlTree {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): true|UrlTree {
    if (!this.currentU.isAdmin) {
      if (url.includes('/overview')){
        return true;
      }
    }else{ // Admins can access both pages. Normal users should only access web
      return true;
    }

    return this.router.parseUrl('');
  }
}
