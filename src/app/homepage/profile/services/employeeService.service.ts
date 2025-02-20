import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Employee } from "../model/employees";
import { Observable } from "rxjs";
const URL='http://localhost:8080/employees'
const API_URL = 'http://localhost:8080/image'; 

@Injectable()
export class ProfileAllEmployees{
    http=inject(HttpClient)
    
    public getAllEmployees(){
        return this.http.get<Employee[]>(`${URL}`);
    }

    
      uploadImage(employeeId: Number, file: File): Observable<string> {
        const formData = new FormData();
        formData.append('file', file);
      
        return this.http.post(`${API_URL}/${employeeId}`, formData, {
          responseType: 'text' 
        });
      }
      
    
      getImage(employeeId: Number): Observable<Blob> {
        return this.http.get(`${API_URL}/${employeeId}`, { responseType: 'blob' });
      }
}