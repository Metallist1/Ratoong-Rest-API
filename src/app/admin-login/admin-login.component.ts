import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { LoginAdmin} from '../shared/states/admin-auth/admin-auth.action';
import {first, takeUntil} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Actions, ofActionSuccessful, Select, Store} from '@ngxs/store';
import {Observable, Subject} from 'rxjs';
import {AdminAuthState} from '../shared/states/admin-auth/admin-auth.state';
import {AdminsUsers} from '../shared/states/admin-auth/entities/AdminUser';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  private ngUnsubscribe = new Subject();

  @Select(AdminAuthState.getAdminAuth) currentUser: Observable<AdminsUsers>;
  currentU: AdminsUsers;

  errorMsg: string;
  loginDetail: FormGroup;
  showPwd = false;

  fieldTextType: boolean;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private actions$: Actions
  ) {

    this.actions$.pipe(ofActionSuccessful(LoginAdmin),
      takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.isLoading = false;
    });

    this.currentUser.subscribe(
      (data) => {
        if (data) {
          if (data.isAdmin) {
            this.router.navigate(['/admin']);
          } else if (!data.isAdmin) {
            this.router.navigate(['/overview']);
          }
        }
      });
  }

  ngOnInit(): any {
    this.loginDetail = this.fb.group({
      email : ['jakubrewald@gmail.com', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(200)])],
      pwd : ['123456789', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
    });
  }

  ngOnDestroy(): any{
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  get f(): any { return this.loginDetail.controls; }

  signIn(): any{
    this.submitted = true;
    if (this.loginDetail.invalid) {
      return;
    }
    this.isLoading = true;
    this.store.dispatch(new LoginAdmin(this.loginDetail.value.email, this.loginDetail.value.pwd))
        .pipe(first())
        .subscribe(
          data => {

          },
          error => {
            this.errorMsg = error;
            this.isLoading = false;
          });
  }

  toggleFieldTextType(): any {
    this.fieldTextType = !this.fieldTextType;
  }
}
