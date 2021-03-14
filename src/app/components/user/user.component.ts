import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  MonthDay,
  ResultVacation,
  Team,
  User,
  UserVacation,
} from '../../types';
import Utils from '../../utils/Utils';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnChanges {
  @Input() teamCounter!: number;
  @Input() memberCounter!: number;
  @Input() team!: Team;
  @Input() member!: User;
  @Input() monthDays!: MonthDay[];
  @Input() userVacations!: UserVacation[];
  @Input() currentDate!: Date;

  currentVacation!: ResultVacation | undefined;

  constructor() {}

  ngOnInit(): void {
    this.currentVacation = Utils.getCurrentMonthVacation(
      this.userVacations,
      this.currentDate
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentVacation = Utils.getCurrentMonthVacation(
      this.userVacations,
      changes.currentDate.currentValue
    );
  }
}
