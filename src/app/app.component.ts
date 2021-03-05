import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentDate: Date = new Date();

  addNewDate(date: Date): void {
    this.currentDate = date;
  }  
}
