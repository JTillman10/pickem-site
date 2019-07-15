import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeekHeaderComponent } from './current-week-header.component';

describe('CurrentWeekHeaderComponent', () => {
  let component: CurrentWeekHeaderComponent;
  let fixture: ComponentFixture<CurrentWeekHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentWeekHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeekHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
