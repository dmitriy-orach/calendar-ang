import { Component, OnDestroy, OnInit } from '@angular/core';

import { CurrentDateService } from 'src/app/services/current-date/current-date.service';
import Utils from '../../utils/Utils';
import { dayType } from '../../types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar-head',
  templateUrl: './calendar-head.component.html',
  styleUrls: ['./calendar-head.component.scss'],
})
export class CalendarHeadComponent implements OnInit, OnDestroy {
  constructor(private dateService: CurrentDateService) {}

  currentHeadDate!: Date;
  monthDays!: dayType[];
  daysAmount!: number;

  subscription!: Subscription;

  ngOnInit() {
    this.subscription = this.dateService.currentDate.subscribe({
      next: (date: Date) => {
        this.currentHeadDate = date;
        this.daysAmount = Utils.calcDaysAmount(this.currentHeadDate);
        this.monthDays = Utils.getDaysOfMonth(
          this.currentHeadDate,
          this.daysAmount
        );
      },
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
