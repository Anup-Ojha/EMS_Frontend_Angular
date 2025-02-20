import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Employee } from "../model/organizationModel";
const apiUrl='http://localhost:8080/employees'
@Injectable()
export class OrganizationAllEmployees{
    http=inject(HttpClient)
    
    public getAllEmployees(){
        return this.http.get<Employee[]>(`${apiUrl}`);
    }
}