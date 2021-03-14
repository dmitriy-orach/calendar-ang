import { Component, Input } from '@angular/core';
import { MonthDay, Team } from 'src/app/types';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  @Input() teamCounter!: number;
  @Input() team!: Team;
  @Input() monthDays!: MonthDay[];
  @Input() currentDate!: Date;

  isOpen = true;

  constructor() {}

  toggleIsOpen(): void {
    this.isOpen = !this.isOpen;
  }
}
