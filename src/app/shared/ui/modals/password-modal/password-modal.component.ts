import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Actions, ofActionErrored, ofActionSuccessful, Store} from '@ngxs/store';
import {ModalService} from '../../../services';
import {ChangePassword} from '../../../states/admin-auth/admin-auth.action';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.scss']
})
export class PasswordModalComponent implements OnInit, OnDestroy {

  submitted = false;
  loading = false;
  passChange = false;
  password: string;
  private ngUnsubscribe = new Subject();
  recoveryForm: FormGroup;
  isError = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private modalService: ModalService,
    private actions$: Actions
  ) {
    this.actions$.pipe(ofActionSuccessful(ChangePassword),
      takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.loading = false;
      this.passChange = true;
      this.isError = false;
    });
    this.actions$.pipe(ofActionErrored(ChangePassword),
      takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.loading = false;
      this.isError = true;
      this.passChange = false;
    });
  }
  ngOnDestroy(): any{
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  ngOnInit(): void {
    this.recoveryForm = this.fb.group({
      currPass : new FormControl(null, Validators.compose([Validators.required, Validators.pattern('[A-Za-z0-9]{6,20}')])),
      newPass : new FormControl(null, Validators.compose([Validators.required, Validators.minLength(6),
        Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9]*$')])),
      newPass2 : new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  get f(): any { return this.recoveryForm.controls; }

  updatePassword(): any {
    this.submitted = true;
    if (this.recoveryForm.invalid) {
      return;
    }
    this.loading = true;
    this.store.dispatch(new ChangePassword(this.recoveryForm.value.currPass, this.recoveryForm.value.newPass));
  }

  closeModal(id): any {
    this.modalService.close(id);
  }

}
