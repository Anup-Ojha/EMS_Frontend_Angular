import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';
const API_URL = 'http://localhost:8080/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  constructor(private http: HttpClient) { }

  registerEmployee(employeeData: Employee) {
    return this.http.post(`${API_URL}`, employeeData,{responseType: 'text'});
  }
}
