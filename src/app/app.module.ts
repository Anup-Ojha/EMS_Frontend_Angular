import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Services
import { LoginService } from './services/loginhttp.service';
import { LeaveService } from './services/leaves.service';
import { DailyAttendanceService } from './services/DailyAttendanceLogs.service';
import { AllEmployees } from './services/AllEmployees.service';

import { AuthInterceptor } from './interceptors/auth.service';
import { HomepageModule } from './homepage/homepage.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { SharedMaterialModule } from './shared/SharedMaterial.module';
import { SharedModule } from './shared/sharedcomponent.module';

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
    SharedModule
  ],
  providers: [
    LoginService,
    LeaveService,
    AllEmployees,
    DailyAttendanceService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
