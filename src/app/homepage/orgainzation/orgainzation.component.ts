import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Employee } from './model/organizationModel';
import { OrganizationAllEmployees } from './services/organizationEmployee.service';

@Component({
  selector: 'app-orgainzation',
  templateUrl: './orgainzation.component.html',
  styleUrls: ['./orgainzation.component.css']
})export class OrgainzationComponent implements OnInit {
  loading: boolean = true;
  employeeService = inject(OrganizationAllEmployees);
  allEmployeeData: Employee[] = [];
  options: string[] = [];
  managerIdOptions: Set<Number> = new Set<Number>;
  selected: Number = 0;
  
  // Define FormControl for the input
  myControl = new FormControl('');

  filteredOptions: Observable<string[]>;

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe((data) => {
      this.allEmployeeData = data;
      for (let i = 0; i < this.allEmployeeData.length; i++) {
        this.options.push(this.allEmployeeData[i].firstName + " " + this.allEmployeeData[i].lastName);
        this.managerIdOptions.add(this.allEmployeeData[i].managerId);
      }
      this.loading = false;
    });

    // Set up the filtered options for autocomplete
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  searchText: string = '';
  filteredData: Employee[] = [];

  onSearchText(searchValue: string) {
    this.searchText = searchValue;
    this.filteredData = this.allEmployeeData.filter(data =>
      data.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      data.lastName.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  onSearchTextManagerId(id) {
    this.selected = id;
    this.allEmployeeData = this.allEmployeeData.filter(data =>
      data.managerId == this.selected
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onResetClick() {
    this.searchText = '';
    this.selected = 0;
    this.myControl.setValue('');
  }
}
