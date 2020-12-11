import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryPreferencesComponent } from './summary-preferences.component';

describe('SummaryPreferencesComponent', () => {
  let component: SummaryPreferencesComponent;
  let fixture: ComponentFixture<SummaryPreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryPreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
