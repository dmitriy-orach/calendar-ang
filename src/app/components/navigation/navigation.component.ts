import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CurrentDateService } from '../../services/current-date/current-date.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  constructor(private dateService: CurrentDateService) {}

  currentNavDate!: Date;
  subscription!: Subscription;

  prevMonth(): void {
    this.dateService.setCurrentDate(
      new Date(
        this.currentNavDate.getFullYear(),
        this.currentNavDate.getMonth() - 1
      )
    );
  }
  nextMonth(): void {
    this.dateService.setCurrentDate(
      new Date(
        this.currentNavDate.getFullYear(),
        this.currentNavDate.getMonth() + 1
      )
    );
  }

  ngOnInit(): void {
    this.subscription = this.dateService.currentDate.subscribe({
      next: (date: Date) => (this.currentNavDate = date),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
