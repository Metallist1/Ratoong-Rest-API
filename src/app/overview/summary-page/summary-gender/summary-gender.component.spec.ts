import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryGenderComponent } from './summary-gender.component';

describe('SummaryGenderComponent', () => {
  let component: SummaryGenderComponent;
  let fixture: ComponentFixture<SummaryGenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryGenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
