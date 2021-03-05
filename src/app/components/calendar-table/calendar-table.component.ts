import { Component, OnInit } from '@angular/core';

import { CalendarHeadComponent } from "../calendar-head/calendar-head.component";

@Component({
  selector: 'app-calendar-table',
  templateUrl: './calendar-table.component.html',
  styleUrls: ['./calendar-table.component.scss']
})
export class CalendarTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
