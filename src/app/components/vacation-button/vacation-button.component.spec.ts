import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationButtonComponent } from './vacation-button.component';

describe('VacationButtonComponent', () => {
  let component: VacationButtonComponent;
  let fixture: ComponentFixture<VacationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacationButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
