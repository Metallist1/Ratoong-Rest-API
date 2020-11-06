import { Injectable } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalMap = new Map();
  private isModalOpen: Subject<boolean>;
  constructor(
    private popupService: NgbModal
  ) {
    this.isModalOpen = new Subject();
  }

  get(id): any{
    return this.modalMap.get(id);
  }

  add(id: string, modal: any): any{
    // add modal to array of active modals
    if (this.modalMap.has(id) === true){
      this.close(id);
    }
    this.modalMap.set(id, modal);
  }

  remove(id: string): any {
    // remove modal from array of active modals
      if (this.modalMap.has(id) === true){
        this.modalMap.delete(id);
      }
  }

  open(id: string, content: any): any {
    // open modal specified by id
    this.add(id, this.popupService.open(content, {ariaLabelledBy: 'modal-basic-title'}));
  }

  close(id: string): any {
    // close modal specified by id
    const modal = this.get(id);
    if (modal != null) {
      modal.close();
      this.remove(id);
    }
  }

  get onChange$(): Observable<boolean> {
    return this.isModalOpen.asObservable().pipe(distinctUntilChanged());
  }

  onChange(isClosed: boolean): any {
    this.isModalOpen.next(isClosed);
  }
}
