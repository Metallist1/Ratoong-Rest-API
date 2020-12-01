import {AfterViewInit, Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {DeviceDetectorService} from '../../services/device-detector.service';

@Component({
  selector: 'app-size-detector',
  templateUrl: './size-detector.component.html',
  styleUrls: ['./size-detector.component.scss']
})
export class SizeDetectorComponent implements OnInit, AfterViewInit {

  constructor(private elementRef: ElementRef, private resizeSvc: DeviceDetectorService) {
  }

  @HostListener('window:resize', [])
  private onResize(): any {
    this.detectScreenSize();
  }
  ngOnInit(): any {
    this.detectScreenSize();
  }
  ngAfterViewInit(): any {
    this.detectScreenSize();
  }

  private detectScreenSize(): any {
    this.resizeSvc.changeSize(window.innerWidth, window.innerHeight);
  }

}
