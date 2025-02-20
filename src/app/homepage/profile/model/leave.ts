export interface Leaves{
    leaveType:String
    fromDate:Date
    tillDate:Date
    status:String
    note:String
    emolpyeeId:Number
    id:Number
}

export interface StaticLeavesModel{
    id:Number,
	leaveType:String,
	leaveDetails:String,
	numberOfLeaves:number
}

export interface WeekCount{
    day:String
    count:Number
}

export interface MonthCount{
    month:String
    count:Number
}


export interface FullLeaveObj{
    id:Number
    leaveDetails:String
    leaveType:String
    numberOfLeaves:number
}