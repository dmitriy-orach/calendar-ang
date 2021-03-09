import { Component, Input, OnInit } from '@angular/core';
import { dayType } from 'src/app/types';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent {
  @Input() currentDate!: Date;
  @Input() counter!: number;
  @Input() team!: any;
  @Input() monthDays!: dayType[];
  vacations: any = 'asdas';

  isOpen: boolean = true;

  constructor() {}

  toggleIsOpen() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen);
  }
}
