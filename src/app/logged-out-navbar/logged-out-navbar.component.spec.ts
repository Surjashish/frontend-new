import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedOutNavbarComponent } from './logged-out-navbar.component';

describe('LoggedOutNavbarComponent', () => {
  let component: LoggedOutNavbarComponent;
  let fixture: ComponentFixture<LoggedOutNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedOutNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedOutNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
