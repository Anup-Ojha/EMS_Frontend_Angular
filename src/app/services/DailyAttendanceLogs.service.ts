import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnInit } from "@angular/core";
import { AttendaceLogs } from "../model/DailyAttendanceLogs";
import { Observable } from "rxjs";
import { CalanderLogs } from "../model/CalendarLogs";
import { Employee } from "../model/employee";
import { Calendar } from "@fullcalendar/core";
const API_URL="http://localhost:8080/attendance"
@Injectable()
export class DailyAttendanceService {

    http=inject(HttpClient);

    getAllAttendaceLogs(id:Number){
        return this.http.get<AttendaceLogs[]>(`${API_URL}/${id}`);
    }

    setDailyAttendance(data:AttendaceLogs){
        return this.http.post(`${API_URL}/mark`,data);
    }

    getCalanderLogs(id:Number){
        return this.http.get(`${API_URL}/calendar/${id}`);
    }

    
}