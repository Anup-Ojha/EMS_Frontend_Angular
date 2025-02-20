import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { SharedMaterialModule } from 'src/app/shared/SharedMaterial.module';
import { SharedModule } from 'src/app/shared/sharedcomponent.module';
import { ChartsComponent } from './charts.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DailychartsComponent } from './dailycharts/dailycharts.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/authguard/auth.guard';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ChartsDailyAttendanceService } from './services/chartsDailyAttendance.service';
import { CalendarLeaveService } from './services/calendarLeaves.service';
import { MatToolbarModule } from '@angular/material/toolbar';


const routes: Routes = [
  { path: '', component: ChartsComponent, canActivate: [AuthGuard]}
];


@NgModule({
  declarations: [
    ChartsComponent,
    CalendarComponent,
    DailychartsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedMaterialModule,
    MatToolbarModule,
    SharedModule,
    FullCalendarModule
  ],
  providers:[ChartsDailyAttendanceService,CalendarLeaveService]
})
export class ChartsModule { }
