import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnInit } from "@angular/core";
import { AttendaceLogs } from "../model/chartsModel";
const API_URL="http://localhost:8080/attendance"
@Injectable()
export class ChartsDailyAttendanceService {

    http=inject(HttpClient);
    getCalanderLogs(id:Number){
        return this.http.get(`${API_URL}/calendar/${id}`);
    }

    getAllAttendaceLogs(id:Number){
            return this.http.get<AttendaceLogs[]>(`${API_URL}/${id}`);
    }

     setDailyAttendance(data:AttendaceLogs){
            return this.http.post(`${API_URL}`,data);
        }
}