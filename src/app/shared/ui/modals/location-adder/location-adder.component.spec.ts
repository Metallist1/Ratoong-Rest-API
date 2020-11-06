import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAdderComponent } from './location-adder.component';

describe('LocationAdderComponent', () => {
  let component: LocationAdderComponent;
  let fixture: ComponentFixture<LocationAdderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationAdderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationAdderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
