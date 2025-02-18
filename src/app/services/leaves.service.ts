import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnInit } from "@angular/core";
import { Leaves } from "../model/leaves";
import { StaticLeavesModel } from "../model/staticLeaves";
import { MonthCount, WeekCount } from "../model/CalendarLogs";
import { FullLeaveObj } from "../model/LeaveDetailsCount";
const API_URL='http://localhost:8080/leaves';
const STATIC_API_URL='http://localhost:8080/staticLeaves';

@Injectable()
export class LeaveService {
    http=inject(HttpClient)
    myStaticLeavesType:String[]=[];
    myStaticLeavesCount:Number[]=[];

    getAllStaticData(){
        this.getAllStaticLeaves().subscribe((data:StaticLeavesModel[])=>{
          data.map(leave => leave.leaveDetails).forEach(leave=>this.myStaticLeavesType.push(leave));
        })
      
        this.getCountOfStaticLeaves().subscribe((data:StaticLeavesModel[])=>{
          data.map(num=>num.numberOfLeaves).forEach(num=>this.myStaticLeavesCount.push(num));
        })
      }
    
    setEmployeeLeaves(data:Leaves){
        return this.http.post(`${API_URL}/add`,data,{responseType: 'json'}).subscribe();
    }

    getAllEmployeeLeavesData(id:Number){
        return this.http.get<Leaves[]>(`${API_URL}/${id}`);
    }


    fetchAndReturn(id:Number){
      return this.http.get(`${API_URL}/${id}`);
    }

    getAllStaticLeaves(){
        return this.http.get<FullLeaveObj[]>(`${STATIC_API_URL}`);
    }

    getCountOfStaticLeaves(){
        return this.http.get(`${STATIC_API_URL}`);
    }

    getAllUserLeaveCount(id:Number){
      return this.http.get(`${API_URL}/count/${id}`);
    }

    getAllWeeksCount(id:Number){
      return this.http.get<WeekCount[]>(`${API_URL}/weeks/${id}`);
    }


    getFilterYearData(startDate,endDate,id){
      return this.http.get<MonthCount[]>(`${API_URL}/filterDateData/${startDate}/${endDate}/${id}`);
    }

    updateEmployeeLeaveDetails(id:Number,data:Leaves){
      return this.http.put(`${API_URL}/employee/update/${id}`,data);
    }

    deleteEmployeeLeaveDetails(id:Number){
      return this.http.delete(`${API_URL}/employee/delete/${id}`);
    }


}