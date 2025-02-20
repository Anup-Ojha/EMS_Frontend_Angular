import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile.component';
import { ImageEditFormComponent } from './image-edit-form/image-edit-form.component';
import { SharedMaterialModule } from 'src/app/shared/SharedMaterial.module';
import { SharedModule } from 'src/app/shared/sharedcomponent.module';
import { AuthGuard } from 'src/app/shared/authguard/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { ProfileLeaveService } from './services/leaveService.service';
import { ProfileAllEmployees } from './services/employeeService.service';

const routes: Routes = [
  { path: '', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    ProfileComponent,
    ImageEditFormComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedMaterialModule,
    SharedModule,
  ],
  providers:[ProfileLeaveService,ProfileAllEmployees]
})
export class ProfileModule { }
