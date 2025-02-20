import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { FullLeaveObj, MonthCount, WeekCount } from "../model/leave";
const API_URL='http://localhost:8080/leaves';
const STATIC_API_URL='http://localhost:8080/staticLeaves';

@Injectable()
export class ProfileLeaveService {
    http=inject(HttpClient)
  
    getAllStaticLeaves(){
        return this.http.get<FullLeaveObj[]>(`${STATIC_API_URL}`);
    }

    getAllUserLeaveCount(id:Number){
      return this.http.get(`${API_URL}/leavesCount/${id}`);
    }

    getAllWeeksCount(id:Number){
      return this.http.get<WeekCount[]>(`${API_URL}/weeksCount/${id}`);
    }

    getFilterYearData(startDate,endDate,id){
      return this.http.get<MonthCount[]>(`${API_URL}/date-range/${startDate}/${endDate}/employee/${id}`);
    }
}