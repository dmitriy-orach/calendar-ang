import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  DayType,
  SingleVacationType,
  Team,
  User,
  UserVacation,
} from '../../types';
import Utils from '../../utils/Utils';
import { CurrentDateService } from '../../services/current-date/current-date.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  @Input() teamCounter!: number;
  @Input() memberCounter!: number;
  @Input() team!: Team;
  @Input() member!: User;
  @Input() monthDays!: DayType[];
  @Input() userVacations!: UserVacation[];

  currentVacation!: SingleVacationType | undefined;
  currentDate!: Date;
  dateSubscription!: Subscription;

  constructor(private dateService: CurrentDateService) {}

  ngOnInit(): void {
    this.dateSubscription = this.dateService.currentDate.subscribe({
      next: (date) => {
        this.currentDate = date;
        this.currentVacation = Utils.getCurrentMonthVacation(
          Utils.getParsedVacations(this.userVacations),
          this.currentDate
        );
      },
    });
  }

  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
  }
}
