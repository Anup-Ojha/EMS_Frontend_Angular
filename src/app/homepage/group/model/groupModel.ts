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

export interface FullLeaveObj{
    id:Number
    leaveDetails:String
    leaveType:String
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


export interface Employee{
    employeeId:Number
    firstName:String
    lastName:String
    username:String
    password:String
    dateOfBirth:Date
    hireDate:Date
    managerId:Number
    salary:Number
    accountDetails:[{
        accountNumber:Number,
        accountName:String,
        branch:String,
        bankName:String,
        ifciCode:String
    }],
    departmentDetails:[{
        departmentName:String
    }],
    leavesDetails:[{
        leaveType:String,
        tillDate:Date,
        fromDate:Date,
        note:String,
        status:String
    }],
    assetsDetails:[{
        assetName:String,
        assetType:String
    }]
}