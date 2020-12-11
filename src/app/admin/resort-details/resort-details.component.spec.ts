import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResortDetailsComponent } from './resort-details.component';

describe('ResortDetailsComponent', () => {
  let component: ResortDetailsComponent;
  let fixture: ComponentFixture<ResortDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResortDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResortDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
