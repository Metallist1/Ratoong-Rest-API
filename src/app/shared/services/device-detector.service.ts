import { Injectable} from '@angular/core';
import {SCREEN_SIZE} from './enums/screen-size.enum';
import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectorService {

  public screenWidth: any;
  public screenHeight: any;
  public currentSize: any;

  get onResize$(): Observable<SCREEN_SIZE> {
    return this.resizeSubject.asObservable().pipe(distinctUntilChanged());
  }

  private resizeSubject: Subject<SCREEN_SIZE>;

  constructor() {
    this.resizeSubject = new Subject();
  }

  onResize(size: SCREEN_SIZE): any {
    this.resizeSubject.next(size);
  }

  changeSize(innerWidth, innerHeight): any {

    this.screenWidth = innerWidth;
    this.screenHeight = innerHeight;
    switch (true) {
      case this.screenWidth < 576:
        this.currentSize = SCREEN_SIZE.XS;
        break;
      case this.screenWidth >= 576 && this.screenWidth < 768:
        this.currentSize = SCREEN_SIZE.SM;
        break;
      case this.screenWidth >= 768 && this.screenWidth < 992:
        this.currentSize = SCREEN_SIZE.MD;
        break;
      case this.screenWidth >= 992  && this.screenWidth < 1366:
        this.currentSize = SCREEN_SIZE.LG;
        break;
      default:
        this.currentSize = SCREEN_SIZE.XL;
        break;
    }
    this.onResize(this.currentSize);
  }

  getCurrentSize(): any{
    return this.currentSize;
  }
}
