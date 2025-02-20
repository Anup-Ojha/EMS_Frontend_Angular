import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/model/employee';
import { LoginService } from 'src/app/services/loginHttp.service';
import { Chart, registerables } from 'chart.js';
import { LeaveCount } from 'src/app/model/LeaveDetailsCount';
import { MonthCount, WeekCount } from 'src/app/model/CalendarLogs';
import { ImageEditFormComponent } from './image-edit-form/image-edit-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileLeaveService } from './services/leaveService.service';
import { ProfileAllEmployees } from './services/employeeService.service';
Chart.register(...registerables);

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy {
  loading:boolean=true;
  employeeString: string = localStorage.getItem('employee'); 
  employee: Employee; 
  chart: any;
  currDate=new Date;
  joiningDate=new Date;
  radarCharts:any;
  myStaticLeavesType: String[] = [];
  dataForChart:LeaveCount[]=[];
  myLeaveCount: number[] = [];
  userTakenLeaves:Number[]=[];
  userTakenLeavesType:String[]=[];
  weeksLabelName:String[]=[];
  weeksCountValues:Number[]=[];
  weeksObjectData:WeekCount[]=[];

  yearLabelName:String[]=[];
  yearCountValues:Number[]=[];
  yearWholeData:MonthCount[]=[];
  currentYear:Number[]=[];
  selected:String='2025';
  yearChart:Boolean=false;
  myImage:string='';
  myTimeStamp:string='';

  constructor(private router:Router,public dialog: MatDialog,private service: LoginService, private staticLeavesDataService: ProfileLeaveService,private profileImageService:ProfileAllEmployees) {}

  ngOnInit() { 
    const employee: Employee = JSON.parse(this.employeeString);
    this.employee = employee; 
    this.joiningDate=this.employee.hireDate;
    this.getDatesArray();
    this.staticLeavesDataService.getAllStaticLeaves().subscribe((data) => {
      this.myStaticLeavesType = data.map(leave => leave.leaveType);
      this.myLeaveCount = data.map(leave => leave.numberOfLeaves); 
      this.myLeaveCount.sort()

      this.staticLeavesDataService.getAllUserLeaveCount(this.employee.employeeId).subscribe((data:LeaveCount[])=>{
        this.dataForChart=data;

        if(this.dataForChart!=null){
            this.userTakenLeavesType=this.myStaticLeavesType.sort();
            for(let i=0;i<this.userTakenLeavesType.length;i++){
              this.userTakenLeaves[i]=0;
              for(let j=0;j<this.dataForChart.length;j++){
                if(this.dataForChart[j].type==this.userTakenLeavesType[i]){
                  this.userTakenLeaves[i]=this.dataForChart[j].COUNT;
                }
              }
            }
      }
      })

      this.staticLeavesDataService.getAllWeeksCount(this.employee.employeeId).subscribe((data)=>{
        this.weeksObjectData=data;
        if(this.weeksObjectData!=null){
          for(let i=0;i<this.weeksObjectData.length;i++){
            this.weeksCountValues.push(this.weeksObjectData[i].count);
            this.weeksLabelName.push(this.weeksObjectData[i].day);
          }
        }
      })


      setTimeout(()=>{
        this.barChart('bar','bar',this.weeksLabelName,this.weeksCountValues,'Total Leaves Taken in Weeks in year');
        this.radarChart('radar','radar',this.myStaticLeavesType,this.myLeaveCount,this.userTakenLeaves);
        this.pieChart('doughnut', 'pieChart', this.userTakenLeavesType, this.userTakenLeaves);
      this.loadImage();
      this.loading=false;
      },1000)  
    });    

    this.filterDataByWholeYear(this.selected);
  }


  filterDataByWholeYear(selected){
    this.loading=true
    let startDate=selected+"-01-01";
    let endDate=selected+"-12-31";
    this.staticLeavesDataService.getFilterYearData(startDate,endDate,this.employee.employeeId).subscribe((data)=>{
        this.yearWholeData=data;
        this.yearCountValues=[]
        this.yearLabelName=[]
        if(this.yearWholeData!=null){
          for(let i=0;i<this.yearWholeData.length;i++){
            this.yearCountValues.push(this.yearWholeData[i].count);
            this.yearLabelName.push(this.yearWholeData[i].month);
          }
        }
        let chartStatus = Chart.getChart("barChart"); 
            if (chartStatus != undefined) {
               chartStatus.destroy();
          }
        this.yearChart=true;
        setTimeout(()=>{
          this.barChart('bar','barChart',this.yearLabelName,this.yearCountValues,'Total Leaves Taken in a Month In a Year');
          this.loading=false
        },1000)
      })
  }

  loadImage(): void {
    this.profileImageService.getImage(this.employee.employeeId).subscribe(
      (res: Blob) => {

        this.myImage = URL.createObjectURL(res);
      },
      (error) => {
        console.error('Error loading image:', error);
      }
    );
  }

  getDatesArray(){
    let start=this.joiningDate.toString();
    let main=parseInt(start);
    let end=this.currDate.getFullYear();
    Number(end);
    while(main!=end+1){
        this.currentYear.push(main);
        main=main+1;
    }
  }


  pieChart(chartType: any, canvasName: any, labelValue: String[], dataValue: Number[]) {
    const Cdata = {
      labels: labelValue,
      datasets: [{
        label: 'Total Leaves',
        data: dataValue,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(153, 102, 255)'
        ],
        hoverOffset: 100,
        borderDashOffset:0.5
      }]
    };

    const config: any = {
      type: chartType,
      data: Cdata,
    };
    this.chart = new Chart(canvasName, config);
  }

radarChart(chartType: any, canvasName: any, labelValue?: String[], dataValue?: number[],userTakenLeaves?:Number[]){

const data = {
  labels: labelValue,
  datasets: [{
    label: 'Leaves Given By Company',
    data: dataValue,
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)'

  }, {
    label: 'Leaves Taken By Employee',
    data: userTakenLeaves,
    fill: true,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    pointBackgroundColor: 'rgb(54, 162, 235)'
  }]
};

  const config = {
    type: chartType,
    data: data,
    options: {
      
    }
  };

  this.chart=new Chart(canvasName,config);
  }


  barChart(chartType:any, canvasName: any, labelValue?: String[], dataValue?: Number[],datasetLabel?:String){
  const data = {
  labels: labelValue,
  datasets: [{
    label: datasetLabel,
    data: dataValue,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)'
    ],
    borderWidth: 1
  }]
};

  const config = {
    type: chartType,
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  this.chart=new Chart(canvasName,config);
  }

@Output() imageUpdate: EventEmitter<any> = new EventEmitter();

openImageDialog(): void {
  const dialogRef = this.dialog.open(ImageEditFormComponent, {
    width: '400px',
    data: { employee: this.employee } 
  });

  dialogRef.afterClosed().subscribe(result => {
      this.loadImage();
      }
    )}

    ngOnDestroy(): void {
      if (this.myImage) {
        URL.revokeObjectURL(this.myImage); 
      }
    }
}
