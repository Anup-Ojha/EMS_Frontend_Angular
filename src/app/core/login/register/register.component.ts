import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../../services/register.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  singleForm: FormGroup;
  

  constructor(private datePipe:DatePipe,private fb: FormBuilder, private registerService: RegisterService, private router: Router) {}

  ngOnInit(): void {
    this.singleForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      hireDate: ['', Validators.required],
      managerId: ['', Validators.required],
      salary: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      accountDetails: this.fb.array([
        this.fb.group({
          accountNumber: ['', Validators.required],
          accountName: ['', Validators.required],
          ifciCode: ['', Validators.required],
          branch: ['', Validators.required],
          bankName: ['', Validators.required],
        })
      ]),
      departmentDetails: this.fb.array([
        this.fb.group({
          departmentName: ['', Validators.required],
        })
      ]),
      assetsDetails: this.fb.array([
        this.fb.group({
          assetName: ['', Validators.required],
          assetType: ['', Validators.required]
        })
      ])
    });
  }

  get accountDetails(): FormArray {
    return this.singleForm.get('accountDetails') as FormArray;
  }

  get departmentDetails(): FormArray {
    return this.singleForm.get('departmentDetails') as FormArray;
  }


  get assetsDetails(): FormArray {
    return this.singleForm.get('assetsDetails') as FormArray;
  }

  addAccountDetail() {
    this.accountDetails.push(this.fb.group({
      accountNumber: ['', Validators.required],
      accountName: ['', Validators.required],
      ifciCode: ['', Validators.required],
      branch: ['', Validators.required],
      bankName: ['', Validators.required],
    }));
  }

  addDepartmentDetail() {
    this.departmentDetails.push(this.fb.group({
      departmentName: ['', Validators.required],
    }));
  }

  addAssetDetail() {
    this.assetsDetails.push(this.fb.group({
      assetName: ['', Validators.required],
      assetType: ['', Validators.required]
    }));
  }

  onSubmit(): void {
    if (this.singleForm.valid) {
      const formData = { ...this.singleForm.value };
      formData.fromDate = this.datePipe.transform(formData.fromDate, 'yyyy-MM-dd');
      formData.tillDate = this.datePipe.transform(formData.tillDate, 'yyyy-MM-dd');
      this.registerService.registerEmployee(formData).subscribe(response => {
        this.router.navigate(['/login']);
      });
    } else {
      console.log('Form is invalid');
    }
  }

  isLinear = false;
  durationInSeconds = 5;

}
