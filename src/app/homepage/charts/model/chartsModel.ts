export interface AttendaceLogs{
    date:Date
    employeeId:Number
    timeStamp:String 
    value:Number
    id:Number
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


export interface FullLeaveObj{
    id:Number
    leaveDetails:String
    leaveType:String
    numberOfLeaves:number
}
export interface Leaves{
    leaveType:String
    fromDate:Date
    tillDate:Date
    status:String
    note:String
    emolpyeeId:Number
    id:Number
}