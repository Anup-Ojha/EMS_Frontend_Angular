import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = 'http://localhost:8080/image'; 

@Injectable({
  providedIn: 'root'
})
export class EmployeeImageService {

  constructor(private http: HttpClient) {}

  uploadImage(employeeId: Number, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
  
    return this.http.post(`${API_URL}/upload/${employeeId}`, formData, {
      responseType: 'text' 
    });
  }
  

  getImage(employeeId: Number): Observable<Blob> {
    return this.http.get(`${API_URL}/${employeeId}`, { responseType: 'blob' });
  }

}
