import { Component, Input, OnInit } from '@angular/core';
import { DayType, SingleVacationType, VacationType } from 'src/app/types';
import Utils from 'src/app/utils/Utils';

@Component({
  selector: 'app-user-vacation',
  templateUrl: './user-vacation.component.html',
  styleUrls: ['./user-vacation.component.scss'],
})
export class UserVacationComponent implements OnInit {
  @Input() vacations!: any;
  @Input() currentDate!: Date;
  @Input() currentCell!: number;
  @Input() counter!: number;

  userVacations!: VacationType[];
  userVacation!: SingleVacationType;

  constructor() {}

  ngOnInit(): void {
    this.userVacation = Utils.getSingleVacation(
      this.counter,
      Utils.getUserVacations(this.vacations),
      this.currentDate
    );
  }

  styleLabel() {
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
}
