import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {Actions, ofActionSuccessful, Select, Store} from '@ngxs/store';
import {Observable, Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalService} from '../../../shared/services';
import {Logout} from '../../../shared/states/admin-auth/admin-auth.action';
import {takeUntil} from 'rxjs/operators';
import {AdminAuthState} from '../../../shared/states/admin-auth/admin-auth.state';
import {AdminsUsers} from '../../../shared/states/admin-auth/entities/AdminUser';
import {SCREEN_SIZE} from '../../../shared/services/enums/screen-size.enum';
import {DeviceDetectorService} from '../../../shared/services/device-detector.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();


  showMobileMenu = true;
  mobile = false;
  device: string;
  @Select(AdminAuthState.getAdminAuth) currentUser: Observable<AdminsUsers>;
  currentU: AdminsUsers;
  isCollapsed = true;
  size: SCREEN_SIZE;

  ngOnInit(): any {}

  ngOnDestroy(): any{
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  constructor(private router: Router,
              private store: Store,
              private popupService: NgbModal,
              private modalService: ModalService,
              private actions$: Actions,
              private resizeSvc: DeviceDetectorService) {
    this.actions$.pipe(ofActionSuccessful(Logout),
      takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.router.navigate(['']);
    });

    this.currentUser.subscribe(
      (data) => {
        this.currentU = data;
      });

    this.size = resizeSvc.getCurrentSize();
    this.mobile = this.size < 3;

    resizeSvc.onResize$.subscribe(x => {
      this.size = x;
      this.mobile = this.size < 3;
    });
  }

  openMobileMenu(): any{
    if (this.mobile){
      this.showMobileMenu = !this.showMobileMenu;
    }
  }

  signOut(): any {
    this.store.dispatch(new Logout());
    this.router.navigate(['/']);
  }

  open(id, content): any {
    this.modalService.open(id, content);
  }
}
