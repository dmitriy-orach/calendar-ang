import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {

  @Input() navDate!: Date;
  @Output() onDateChange = new EventEmitter<Date>();
  currentNavDate!: Date;

  prevMonth() { 
    this.currentNavDate = new Date(this.navDate.getFullYear(), this.navDate.getMonth() - 1);
  }
  nextMonth() { 
    this.currentNavDate = new Date(this.navDate.getFullYear(), this.navDate.getMonth() + 1);
  }

  setNewDateToParent(newDate: Date) { 
    this.onDateChange.emit(newDate);
  }
}
