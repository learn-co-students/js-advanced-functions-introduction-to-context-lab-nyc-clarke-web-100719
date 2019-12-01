// Your code here
function createEmployeeRecord(employeeArr) {
    let employeeInfo = {
        firstName: employeeArr[0],
        familyName: employeeArr[1],
        title: employeeArr[2],
        payPerHour: employeeArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeInfo
}

function createEmployeeRecords(arrOfArr) {
    return arrOfArr.map(function(arr){
        return createEmployeeRecord(arr);
    })
}

function createTimeInEvent(employeeObject, dateStamp) {
    let dateArr = dateStamp.split(" ");
    let timeObject = {"type": "TimeIn", "date": dateArr[0], "hour": parseInt(dateArr[1])};
    employeeObject.timeInEvents.push(timeObject);
    return employeeObject;
}

function createTimeOutEvent(employeeObject, dateStamp) {
    // let updatedEmployee = createEmployeeRecord(employeeObject)
    let dateArr = dateStamp.split(" ");
    let timeObject = {"type": "TimeOut", "date": dateArr[0], "hour": parseInt(dateArr[1])};
    employeeObject.timeOutEvents.push(timeObject);
    return employeeObject;
}


function hoursWorkedOnDate(employeeObject, dateStamp) {
    let timeInInst = employeeObject.timeInEvents.find(function(timeIn){
        return timeIn.date === dateStamp
    });
    let timeOutInst = employeeObject.timeOutEvents.find(function(timeOut){
        return timeOut.date === dateStamp
    });
    return (timeOutInst.hour - timeInInst.hour) / 100;
}

function wagesEarnedOnDate(employeeObject, dateStamp) {
    return employeeObject.payPerHour * hoursWorkedOnDate(employeeObject, dateStamp);
}

function allWagesFor(employeeObject) {
    let allWages = employeeObject.timeInEvents.map(function(timeIn){
        return wagesEarnedOnDate(employeeObject, timeIn.date)
    })
    let totalOwed = allWages.reduce(function(total, wage){
        return total + wage
    })
    return totalOwed
}

function findEmployeeByFirstName(employeeArr, firstName) {
    return employeeArr.find(function(employee){
        return employee.firstName === firstName
    })
}

function calculatePayroll(employeeArr) {
    let wagesArr = employeeArr.map(function(employee){
        return allWagesFor(employee)
    })
    let netTotal = wagesArr.reduce(function(total, wage){
        return total + wage
    })
    return netTotal
}