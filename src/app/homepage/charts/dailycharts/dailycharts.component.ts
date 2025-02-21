import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { AttendaceLogs } from 'src/app/model/DailyAttendanceLogs';
import { ChartsDailyAttendanceService } from '../services/chartsDailyAttendance.service';
import { Employee } from '../model/chartsModel';

@Component({
  selector: 'app-dailycharts',
  templateUrl: './dailycharts.component.html',
  styleUrls: ['./dailycharts.component.css']
})
export class DailychartsComponent {
  loading:boolean=false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  submitButton=false;

  displayedColumns: string[] = ['date', 'progress','timeStamp'];

  attendanceForm: FormGroup;
  timeSlots=new Map<String,number> ();
  todaysDate=new Date();

  formatDateISO = (date) => {
    const isoString = date.toISOString();
    const formattedDate = isoString.split("T")[0];
    return formattedDate.slice(0,10);
};

  currentDate = new Date();
  dataSource:AttendaceLogs[]=[];  
  getmonth=this.todaysDate.getMonth()+1;
  MAIN_DATE=this.formatDateISO(this.currentDate);

  employeeString: string = localStorage.getItem('employee'); 
  employeesMainData: Employee; 
  changes:Number
  onSelectionChange(event: any) {
  const selectedKey = event.value;
  const selectedValue = this.timeSlots.get(selectedKey);
  this.attendanceForm.patchValue({ value: selectedValue });
}

displayTableData(){
  this.dailyAttendaceService.getAllAttendaceLogs(this.employeesMainData.employeeId).subscribe(
    (data) => {
      data.reverse();
      this.dataSource = data.slice(0,10);
      if(this.dataSource[0].date===this.MAIN_DATE){
        this.submitButton=true;
      }
    });
}

  constructor(private fb: FormBuilder,private dailyAttendaceService:ChartsDailyAttendanceService) {
    this.loading=true
    const employee: Employee = JSON.parse(this.employeeString);
    this.employeesMainData = employee;
    this.displayTableData();

    this.timeSlots.set('09:00 AM - 07:00 PM',100);
    this.timeSlots.set('10:00 AM - 08:00 PM',100);
    this.timeSlots.set('10:00 AM - 02:00 PM (Half Day)',50);
    this.timeSlots.set('03:00 AM - 08:00 PM (Half Day)',50);
    this.timeSlots.set('02:00 AM - 07:00 PM (Half Day)',50);

    this.attendanceForm = this.fb.group({
      date: [this.MAIN_DATE],  
      timeStamp: ['',Validators.required],
      employeeId:[this.employeesMainData.employeeId,Validators.required],  
      value:['',Validators.required]
    });
    this.loading=false

    this.displayTableData()


  }

  submitForm() {
    this.dailyAttendaceService.setDailyAttendance(this.attendanceForm.value).subscribe();
    setTimeout(()=>{
      this.displayTableData()
    },1000); 
    this.displayTableData()
    this.displayTableData()

  }
 
  
  
}
