import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryTypeComponent } from './summary-type.component';

describe('SummaryTypeComponent', () => {
  let component: SummaryTypeComponent;
  let fixture: ComponentFixture<SummaryTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
