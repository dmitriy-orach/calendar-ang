import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CalendarTableComponent } from './components/calendar-table/calendar-table.component';
import { TeamComponent } from './components/team/team.component';
import { UserVacationComponent } from './components/user-vacation/user-vacation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import {MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CalendarTableComponent,
    TeamComponent,
    UserVacationComponent,
    ModalWindowComponent,
  ],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, MatDialogModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalWindowComponent]
})
export class AppModule {}
