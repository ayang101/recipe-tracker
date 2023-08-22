import { useState } from 'react';
import './App.css';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const abbrMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const abbrDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
const numDays = 7;
const numMonths = 12;
const mealCategories = ['Breakfast', 'Lunch', 'Dinner'];

const currDate = new Date();
const currYear = currDate.getFullYear();
// months are 0-indexed, ex. month 1 gets the last day of the 0th month
const currMonth = currDate.getMonth();
// days are from 0-6
const currDay = currDate.getDay();


// given year and month, gets the last day of the current month
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDateOfWeek(year, month, day) {
    const d = getDayOfWeek(year, month, day);
    var dStart = day - d;
    if (dStart < 1) {
        const lastDayOfPrevMonth = getDaysInMonth(year, month - 1);
        dStart = lastDayOfPrevMonth + (day - d);
        if (month - 1 < 0) {
            return new Date(year - 1, numMonths - 1, dStart);
        }
        return new Date(year, month - 1, dStart);
    }
    return new Date(year, month, dStart);

}

// given year, month, and day, gets the day of the week
function getDayOfWeek(year, month, day) {
    const d = new Date(year, month, day);
    return d.getDay();
}

// gets the day of the current date
const dayOfCurrDate = getDayOfWeek(
    currYear,
    currMonth,
    currDay
);


function Planner(props) {
    const [monthView, setMonthView] = useState(currMonth);
    const [yearView, setYearView] = useState(currYear);
    const [startDate, setStartDate] = useState(getFirstDateOfWeek(yearView, monthView, currDate.getDate()));

    const addWeek = () => {
        var d = startDate.getDate();
        var m = startDate.getMonth();
        var y = startDate.getFullYear();
        var dInMonth = getDaysInMonth(y, m);
        if (d + numDays > dInMonth) {
            var dInMonth = getDaysInMonth(y, m);
            if (m + 1 > numMonths - 1) {
                y += 1;
                m = 0;
                // special case: last day of the month falls on a Sunday
                if (dInMonth === d) {
                    setStartDate(new Date(y, m, numDays));
                } else {
                    setStartDate(new Date(y, m, numDays - (dInMonth - d)));
                }
                setYearView(yearView + 1);
            } else {
                m += 1;
                setStartDate(new Date(y, m, numDays - (dInMonth - d)));
            }
        } else {
            setStartDate(new Date(y, m, d + numDays));
        }
    }

    const subWeek = () => {
        var d = startDate.getDate();
        var m = startDate.getMonth();
        var y = startDate.getFullYear();
        var dInPrevMonth = getDaysInMonth(y, m - 1);
        if (d - numDays < 0) {
            if (m - 1 < 0) {
                y -= 1;
                m = numMonths - 1;
                setStartDate(new Date(y, m, dInPrevMonth + (d - numDays)));
                setYearView(yearView - 1);
            } else {
                m -= 1;
                setStartDate(new Date(y, m, dInPrevMonth + (d - numDays)));
            }
        } else {
            setStartDate(new Date(y, m, d - numDays));
        }
    }

    function getWeek() {
        var weekArr = []
        var d = startDate.getDate();
        var m = startDate.getMonth();
        var y = startDate.getFullYear();
        const dInMonth = getDaysInMonth(y, m);
        var isIncrMonth = false;
        for (var i=0; i<numDays; i++) {
            if (d + i > dInMonth) {
                if (m > numMonths - 1) {
                    y += 1;
                    m = 0;
                } else {
                    if (!isIncrMonth) {
                        m += 1;
                        isIncrMonth = true;
                    }
                }
                weekArr.push(new Date(y, m, (d + i) - dInMonth));
            } else {
                weekArr.push(new Date(y, m, d + i));
            }
        }
        console.log('week array');
        console.log(weekArr);
        return weekArr;
    }

    return (
        <div>
            <h1>My Planner</h1>
            <h5>{yearView}</h5>
            <button onClick={subWeek}>prev</button>
            <button onClick={addWeek}>next</button>
            <table className='planner-table'>
                <tr className='planner-tr'>
                    <th></th>
                    {console.log("startdate:")}
                    {console.log(startDate)}
                    {getWeek().map((element, index) => {
                        return (
                            <th className='planner-th-col' scope='col'>
                                {(abbrDays[element.getDay()] + " " + abbrMonths[element.getMonth()] + " " + element.getDate())}
                            </th>
                        );
                    })}
                </tr>
                {mealCategories.map((element, index) => {
                    return (
                        <tr>
                            <th className='planner-th-row' scope='row'>{element}</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    );
                })}
            </table>
        </div>
    );
};
  
export default Planner;