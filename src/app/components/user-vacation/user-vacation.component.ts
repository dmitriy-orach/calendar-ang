import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SingleVacationType, UserVacation, VacationType } from 'src/app/types';
import Utils from 'src/app/utils/Utils';

@Component({
  selector: 'app-user-vacation',
  templateUrl: './user-vacation.component.html',
  styleUrls: ['./user-vacation.component.scss'],
})
export class UserVacationComponent implements OnInit {
  @Input() vacations!: UserVacation[];
  @Input() currentDate!: Date;
  @Input() currentCell!: number;
  @Input() counter!: number;

  @Output() vacationInitEvent = new EventEmitter<SingleVacationType>();
  userVacations!: VacationType[];
  userVacation!: SingleVacationType | undefined;

  constructor() {}

  ngOnInit(): void {
    this.userVacation = Utils.getSingleVacation(
      this.counter,
      Utils.getUserVacations(this.vacations),
      this.currentDate
    );
    this.sendVacationToParent(this.userVacation);
  }

  styleLabel(): object | null {
    if (this.userVacation) {
      if (this.userVacation.labelDirection === 'left') {
        return {
          'width.px': this.userVacation.vacationLength * 32 - 3,
          left: '1px',
        };
      } else {
        return {
          'width.px': this.userVacation.vacationLength * 32 - 3,
          right: '1px',
        };
      }
    }
    return null;
  }

  sendVacationToParent(value: SingleVacationType | undefined): void {
    this.vacationInitEvent.emit(value);
  }
}
