import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryRatingTableComponent } from './summary-rating-table.component';

describe('SummaryRatingTableComponent', () => {
  let component: SummaryRatingTableComponent;
  let fixture: ComponentFixture<SummaryRatingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryRatingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryRatingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
