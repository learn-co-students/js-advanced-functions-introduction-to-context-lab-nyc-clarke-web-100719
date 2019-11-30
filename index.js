// Your code here
function createEmployeeRecord(arr){

    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = arr =>{
    return arr.map(createEmployeeRecord)
}

function createTimeInEvent(empl, dateIn){
    const temp = dateIn.split(' ')
    empl.timeInEvents.push({
        type:"TimeIn",
        hour: parseInt(temp[1]),
        date: temp[0]
    })
    return empl
}

const createTimeOutEvent = (emp, dateOut) => {
    dateOut = dateOut.split(' ')
    emp.timeOutEvents.push({
        type:"TimeOut",
        hour: parseInt(dateOut[1]),
        date: dateOut[0]
    })
    return emp
}

function hoursWorkedOnDate(emp, dateToCheck){
    let inTime = emp.timeInEvents.find(day => day.date === dateToCheck)
    let ouTime = emp.timeOutEvents.find(day => day.date === dateToCheck)
    return (ouTime.hour - inTime.hour)/100
}

function wagesEarnedOnDate(emp, dateToCheck){
    return emp.payPerHour * hoursWorkedOnDate(emp, dateToCheck)
}

function allWagesFor(emp){
    let allDates = emp.timeInEvents.map(card => card.date)
    let total = allDates.reduce((tot, day) => tot + wagesEarnedOnDate(emp, day),0)
    return total
}

function findEmployeeByFirstName(arr, nameToCheck){
    return arr.find(emp => emp.firstName === nameToCheck )
}

function calculatePayroll(arr){
    return arr.reduce((total,emp) => total + allWagesFor(emp),0)
}