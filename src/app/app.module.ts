import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CalendarTableComponent } from './components/calendar-table/calendar-table.component';
import { CalendarHeadComponent } from './components/calendar-head/calendar-head.component';
import { VacationButtonComponent } from './components/vacation-button/vacation-button.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CalendarTableComponent,
    CalendarHeadComponent,
    VacationButtonComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
