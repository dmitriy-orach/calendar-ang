import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CalendarTableComponent } from './components/calendar-table/calendar-table.component';

import { TeamComponent } from './components/team/team.component';
import { UserComponent } from './components/user/user.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CalendarTableComponent,
    TeamComponent,
    UserComponent,
    ModalWindowComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalWindowComponent],
})
export class AppModule {}
