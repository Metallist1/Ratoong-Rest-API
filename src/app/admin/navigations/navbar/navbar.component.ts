import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Actions, ofActionSuccessful, Store} from '@ngxs/store';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalService} from '../../../shared/services';
import {Logout} from '../../../shared/states/admin-auth/admin-auth.action';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  ngOnInit(): any {}

  constructor(private router: Router,
              private store: Store,
              private popupService: NgbModal,
              private modalService: ModalService,
              private actions$: Actions) {
    this.actions$.pipe(ofActionSuccessful(Logout),
      takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.router.navigate(['']);
    });

  }

  ngOnDestroy(): any{
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  open(id, content): any {
    this.modalService.open(id, content);
  }

  signOut(): any {
      this.store.dispatch(new Logout());
      this.router.navigate(['']);
  }
}
