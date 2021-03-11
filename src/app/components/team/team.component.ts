import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DayType, SingleVacationType, Team } from 'src/app/types';
import { CurrentDateService } from '../../services/current-date/current-date.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit, OnDestroy {
  @Input() teamCounter!: number;
  @Input() team!: Team;
  @Input() monthDays!: DayType[];

  isOpen = true;
  userVacation!: SingleVacationType;
  currentDate!: Date;
  dateSubscription!: Subscription;

  constructor(private dateService: CurrentDateService) {}

  ngOnInit(): void {
    this.dateSubscription = this.dateService.currentDate.subscribe({
      next: (date: Date) => {
        this.currentDate = date;
      },
    });
  }

  toggleIsOpen(): void {
    this.isOpen = !this.isOpen;
  }

  addVacation(newVacation: SingleVacationType): void {
    this.userVacation = newVacation;
    console.log(this.userVacation);
  }

  ngOnDestroy(): void {
    this.dateSubscription.unsubscribe();
  }
}
