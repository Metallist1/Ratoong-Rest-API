import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResortsComponent } from './resorts.component';

describe('DashboardComponent', () => {
  let component: ResortsComponent;
  let fixture: ComponentFixture<ResortsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResortsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResortsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
