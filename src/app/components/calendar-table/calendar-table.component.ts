import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DayType } from 'src/app/types';
import Utils from 'src/app/utils/Utils';
import { CurrentDateService } from '../../services/current-date/current-date.service';
import { TeamDataService } from '../../services/team-data/team-data.service';

@Component({
  selector: 'app-calendar-table',
  templateUrl: './calendar-table.component.html',
  styleUrls: ['./calendar-table.component.scss'],
})
export class CalendarTableComponent implements OnInit, OnDestroy {
  constructor(
    private dateService: CurrentDateService,
    private teamsDataService: TeamDataService
  ) {}

  currentTableDate!: Date;
  monthDays!: DayType[];
  daysAmount!: number;
  departmentTeams!: any;
  dateSubscription!: Subscription;
  teamsDataSubscription!: Subscription;

  ngOnInit() {
    this.dateSubscription = this.dateService.currentDate.subscribe({
      next: (date: Date) => {
        this.currentTableDate = date;
        this.daysAmount = Utils.calcDaysAmount(this.currentTableDate);
        this.monthDays = Utils.getDaysOfMonth(
          this.currentTableDate,
          this.daysAmount
        );
      },
    });

    this.teamsDataSubscription = this.teamsDataService
      .putTeamsData()
      .subscribe({
        next: (data) => {
          this.departmentTeams = data;
        },
        error: () => alert('Data was not loaded!'),
      });
  }

  ngOnDestroy() {
    this.dateSubscription.unsubscribe();
    this.teamsDataSubscription.unsubscribe();
  }
}
