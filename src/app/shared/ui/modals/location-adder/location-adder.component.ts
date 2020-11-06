import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {Subject} from 'rxjs';
import {ModalService} from '../../../services';

@Component({
  selector: 'app-location-adder',
  templateUrl: './location-adder.component.html',
  styleUrls: ['./location-adder.component.scss']
})
export class LocationAdderComponent implements OnInit, OnDestroy {

  newLocation: FormGroup;
  destinationAdded = false;
  newLocationName = '';
  submitted = false;
  private ngUnsubscribe = new Subject();

  constructor(private fb: FormBuilder,
              private store: Store,
              private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.newLocation = this.fb.group({
      city: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
      name: [null, Validators.compose([Validators.minLength(2), Validators.maxLength(40)])],
      website: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
    });
  }

  ngOnDestroy(): any{
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  get f(): any { return this.newLocation.controls; }

  addDest(): void {
  }

  closeModal(id): any {
    this.modalService.close(id);
  }

}
