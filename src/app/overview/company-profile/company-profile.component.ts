import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../shared/services';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AdminsUsers} from '../../shared/states/admin-auth/entities/AdminUser';
import {Observable} from 'rxjs';
import {AdminAuthState} from '../../shared/states/admin-auth/admin-auth.state';
import {Select, Store} from '@ngxs/store';
import {GenerateAPIKey, LoginAdmin} from '../../shared/states/admin-auth/admin-auth.action';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {

  isLoading = false;
  fieldTextType: boolean;
  private userData: FormGroup;

  @Select(AdminAuthState.getAdminAuth) currentUser: Observable<AdminsUsers>;

  currentU: AdminsUsers;

  constructor(private modalService: ModalService,
              private fb: FormBuilder,
              private store: Store) {
  }

  ngOnInit(): void {
    this.createUser();
    this.currentUser.subscribe(
      (data) => {
        this.userData.patchValue({
          email: data.email,
          apiKey: data.apiKey,
          apiSecret: data.apiSecret
        });
      });
  }

  private createUser(): any {
    this.userData = this.fb.group({
      apiKey: null,
      apiSecret: null,
      email: null,
    });
  }

  open(id, content): any {
    this.modalService.open(id, content);
  }

  toggleFieldTextType(): any {
    this.fieldTextType = !this.fieldTextType;
  }

  generateKey(): any {
    this.store.dispatch(new GenerateAPIKey())
      .pipe(first())
      .subscribe(
        data => {

        },
        error => {
          this.isLoading = false;
        });
  }
}
