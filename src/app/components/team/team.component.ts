import { Component, Input, OnInit } from '@angular/core';
import { DayType, SingleVacationType, Team } from 'src/app/types';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  @Input() currentDate!: Date;
  @Input() counter!: number;
  @Input() team!: Team;
  @Input() monthDays!: DayType[];

  isOpen: boolean = true;
  userVacation!: SingleVacationType;

  constructor() {}

  toggleIsOpen() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen);
  }
}
