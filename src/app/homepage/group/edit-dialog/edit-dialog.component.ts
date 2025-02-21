import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GroupLeaveService } from '../services/groupLeaves.service';
import { Employee, Leaves } from '../model/groupModel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent {
  leaveUpdateForm: FormGroup;
  employeeString: string = localStorage.getItem('employee');
    employee: Employee = JSON.parse(this.employeeString);
    employeesMainData: Employee = this.employee;
  todayDate:Date = new Date();

  myStaticLeaves:String[]=["Paid Leaves","Casual Leaves","Floater Leaves","Festive Leaves","Emergency Leaves"]
  constructor(private fb: FormBuilder,private datePipe:DatePipe,private dialog: MatDialogRef<EditDialogComponent>,@Inject(MAT_DIALOG_DATA) public emp: Leaves,private leaveService:GroupLeaveService) {
      
    this.leaveUpdateForm = this.fb.group({
          leaveType: [emp.leaveType, Validators.required],
          fromDate: [emp.fromDate, Validators.required],
          tillDate: [emp.tillDate, Validators.required],
          status: [emp.status, Validators.required],
          note: [emp.note],
          id:[emp.id],
          employee: this.fb.group({
            employeeId: [this.employeesMainData.employeeId, Validators.required]
          })
        });
  }


  onSubmit(){
    if (this.leaveUpdateForm.valid) {
    let leaveData: Leaves;
    const formData = { ...this.leaveUpdateForm.value };
    formData.fromDate = this.datePipe.transform(formData.fromDate, 'yyyy-MM-dd');
    formData.tillDate = this.datePipe.transform(formData.tillDate, 'yyyy-MM-dd');
      leaveData = this.leaveUpdateForm.value;
      this.leaveService.updateEmployeeLeaveDetails(leaveData.id,leaveData).subscribe((res)=>{
      });
    }
    setTimeout(()=>{
      this.dialog.close();
    },1000);
      
  }
  

  deleteData(id:Number){
    this.leaveService.deleteEmployeeLeaveDetails(id).subscribe((res)=>{
      this.dialog.close()
    })
  }


}
