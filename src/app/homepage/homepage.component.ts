import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Employee } from '../model/employee';
import { EmployeeImageService } from '../services/EmployeeImage.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  loading:boolean=false;
  myImage:String="";
  toggleDrawer(): void {
    this.drawerOpened = !this.drawerOpened;
  }

  on=true;

  constructor(iconRegistry: MatIconRegistry, private router:Router,private imageService:EmployeeImageService) {
    this.loading=true

    this.loadImage()
    this.loading=false

  }
    drawerOpened = true; // Initially open
    dataEmp=localStorage.getItem('employee');
    employee: Employee = JSON.parse(this.dataEmp);
  
    navigateToProfile() {
      this.router.navigate(['home/profile']);
      this.on=false;
    }
  
    navigateToGroup() {
      this.router.navigate(['home/group']);
      this.on=false;

    }
  
    navigateToSettings() {
      this.router.navigate(['logout']);
      this.on=false;
    }

    navigateToMenu(){
      this.router.navigate(['home/attendance']);
      this.on=false;
    }

    navigateToOrganinzation(){
      this.router.navigate(['home/organization']);
      this.on=false;
    }


    loadImage(): void {
      this.imageService.getImage(this.employee.employeeId).subscribe(
        (res: Blob) => {
          // Convert the Blob to a URL
          this.myImage = URL.createObjectURL(res);
        },
        (error) => {
          console.error('Error loading image:', error);
        }
      );
    }
  }
  
