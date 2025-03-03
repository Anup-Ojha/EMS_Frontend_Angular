import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupComponent } from './group.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedMaterialModule } from 'src/app/shared/SharedMaterial.module';
import { SharedModule } from 'src/app/shared/sharedcomponent.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/authguard/auth.guard';
import { GroupLeaveService } from './services/groupLeaves.service';

const routes: Routes = [
  { path: '', component: GroupComponent, canActivate: [AuthGuard]}
];



@NgModule({
  declarations: [
    GroupComponent,
    EditDialogComponent,
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
  exports: [RouterModule],
  providers:[GroupLeaveService,DatePipe]
})
export class GroupModule { }
