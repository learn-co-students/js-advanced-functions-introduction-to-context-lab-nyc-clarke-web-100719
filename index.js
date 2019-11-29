// Your code here
function createEmployeeRecord(employeeInfo) {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeInfos) {
    return employeeInfos.map(createEmployeeRecord)
}

function createTimeInEvent(employee, dateStamp) {
    const dateSplit = dateStamp.split(" ")
    const date = dateSplit[0]
    const hour = parseInt(dateSplit[1])
    const dateObj = {
        type: "TimeIn",
        hour: hour,
        date: date
    }
    employee.timeInEvents.push(dateObj)
    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    const dateSplit = dateStamp.split(" ")
    const date = dateSplit[0]
    const hour = parseInt(dateSplit[1])
    const dateObj = {
        type: "TimeOut",
        hour: hour,
        date: date
    }
    employee.timeOutEvents.push(dateObj)
    return employee
}

function hoursWorkedOnDate(employee, date) {
    const timeInEventOnDate = employee.timeInEvents.find(function(dateObj) {
        return dateObj.date === date
    })
    const timeOutEventOnDate = employee.timeOutEvents.find(function(dateObj) {
        return dateObj.date === date
    })
    return (timeOutEventOnDate.hour - timeInEventOnDate.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
    return employee.payPerHour * hoursWorkedOnDate(employee, date)
}

function allWagesFor(employee) {
    let allDates = employee.timeInEvents.map(function(event){
        return event.date
    })

    return allDates.reduce(function(sum, date) {
        return sum + wagesEarnedOnDate(employee, date)
    }, 0)
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(employee) {
        return employee.firstName === firstName
    })
}

function calculatePayroll(srcArray) {
   return srcArray.reduce(function(sum, employee) {
        return sum + allWagesFor(employee)
    }, 0)
}