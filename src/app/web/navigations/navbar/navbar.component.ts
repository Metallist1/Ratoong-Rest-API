import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalService} from '../../../shared/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  ngOnInit(): any {}

  constructor(private router: Router,
              private store: Store,
              private popupService: NgbModal,
              private modalService: ModalService) {

  }

  open(id, content): any {
    this.modalService.open(id, content);
  }
}
