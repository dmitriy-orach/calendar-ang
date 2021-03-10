import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVacationComponent } from './user-vacation.component';

describe('UserComponent', () => {
  let component: UserVacationComponent;
  let fixture: ComponentFixture<UserVacationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserVacationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
