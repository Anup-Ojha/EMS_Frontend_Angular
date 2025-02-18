import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Components
import { HomepageComponent } from './homepage.component';
import { SharedMaterialModule } from '../shared/SharedMaterial.module';
import { SharedModule } from '../shared/sharedcomponent.module';
import { HomePageRoutingModule } from './homepage-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ProfileModule } from './profile/profile.module';
import { OrgainzationModule } from './orgainzation/orgainzation.module';
import { GroupModule } from './group/group.module';
import { ChartsModule } from './charts/charts.module';


@NgModule({
  declarations: [
    HomepageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedMaterialModule,
    SharedModule,
    HomePageRoutingModule,
    FullCalendarModule,
    ProfileModule,
    OrgainzationModule,
    GroupModule,
    ChartsModule
  ]
})
export class HomepageModule { }
