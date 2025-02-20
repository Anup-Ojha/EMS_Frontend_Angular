import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnInit } from "@angular/core";
import { FullLeaveObj, Leaves } from "../model/groupModel";
const API_URL='http://localhost:8080/leaves';
const STATIC_API_URL='http://localhost:8080/staticLeaves';

@Injectable()
export class GroupLeaveService {
    http=inject(HttpClient)
    myStaticLeavesType:String[]=[];
    myStaticLeavesCount:Number[]=[];


    setEmployeeLeaves(data:Leaves){
      return this.http.post(`${API_URL}`,data,{responseType: 'json'}).subscribe();
    }

  getAllEmployeeLeavesData(id:Number){
    return this.http.get<Leaves[]>(`${API_URL}/${id}`);
  }



  getAllUserLeaveCount(id:Number){
    return this.http.get(`${API_URL}/leavesCount/${id}`);
  }

  getAllStaticLeaves(){
    return this.http.get<FullLeaveObj[]>(`${STATIC_API_URL}`);
}

    updateEmployeeLeaveDetails(id:Number,data:Leaves){
      return this.http.put(`${API_URL}/employee/${id}`,data);
    }

    deleteEmployeeLeaveDetails(id:Number){
      return this.http.delete(`${API_URL}/employee/${id}`);
    }


}