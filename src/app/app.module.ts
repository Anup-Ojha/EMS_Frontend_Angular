import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Services
import { LoginService } from './services/loginHttp.service';
import { LeaveService } from './services/leaves.service';
import { DailyAttendanceService } from './services/dailyAttendanceLogs.service';

import { AuthInterceptor } from './shared/interceptors/auth.service';
import { HomepageModule } from './homepage/homepage.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/login/login.component';
import { LogoutComponent } from './core/login/logout/logout.component';
import { RegisterComponent } from './core/login/register/register.component';
import { SharedMaterialModule } from './shared/SharedMaterial.module';
import { SharedModule } from './shared/sharedcomponent.module';
import { FullCalendarModule } from '@fullcalendar/angular';

const myroutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'home', loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule) }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(myroutes),
    ReactiveFormsModule,
    CommonModule,
    HomepageModule,
    SharedMaterialModule,
    SharedModule,
    FullCalendarModule
  ],
  providers: [
    LoginService,
    LeaveService,
    DailyAttendanceService,
   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
