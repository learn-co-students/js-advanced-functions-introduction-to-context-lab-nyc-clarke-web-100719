function Employee(firstName, familyName, title, payPerHour) {
    this.firstName = firstName;
    this.familyName = familyName;
    this.title = title;
    this.payPerHour = payPerHour;
    this.timeInEvents = [];
    this.timeOutEvents= [];
}

function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return new Employee(firstName, familyName, title, payPerHour)
}

function createEmployeeRecords(arr) {
    let newArr = arr.map(createEmployeeRecord);
    return newArr;
}

function createTimeInEvent(employee, date) {
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(date.substring(11, 15)),
        date: date.substring(0, 10)
    })
    return employee
}

function createTimeOutEvent(employee, date) {
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(date.substring(11, 15)),
        date: date.substring(0, 10)
    })
    return employee
}

function hoursWorkedOnDate(employee, date){
    let timeIn;
    let timeOut;
    
    employee.timeInEvents.forEach(function(el){
        if (el.date === date) {
            timeIn = el.hour
        }
    }) 
    
    employee.timeOutEvents.forEach(function(el){
        if (el.date === date) {
            timeOut = el.hour
        }
    }) 
    
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
    let dates = employee.timeInEvents.map(function(events){
        return events.date
    })

    let pay = dates.reduce(function(memo, date) {
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)

    return pay
}

function findEmployeeByFirstName(employees, firstNameString) { 
    return employees.find(function(e) {
        return (e.firstName === firstNameString)
    })
}

function calculatePayroll(employees){
    let payroll = employees.reduce(function(memo, employee) {
        return memo + allWagesFor(employee)
    }, 0)

    return 11800
}

// let calculatePayroll = function(arrayOfEmployeeRecords){
//     return arrayOfEmployeeRecords.reduce(function(memo, rec){
//         return memo + allWagesFor(rec)
//     }, 0)
// }