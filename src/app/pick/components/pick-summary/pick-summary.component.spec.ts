import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickSummaryComponent } from './pick-summary.component';

describe('PickSummaryComponent', () => {
  let component: PickSummaryComponent;
  let fixture: ComponentFixture<PickSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
