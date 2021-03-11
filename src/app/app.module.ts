import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CalendarTableComponent } from './components/calendar-table/calendar-table.component';
import { VacationButtonComponent } from './components/vacation-button/vacation-button.component';
import { TeamComponent } from './components/team/team.component';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CalendarTableComponent,
    VacationButtonComponent,
    TeamComponent,
    UserComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
