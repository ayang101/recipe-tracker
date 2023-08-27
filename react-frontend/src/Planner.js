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
    const [draggedRecipe, setDraggedRecipe] = useState(null);
    const [meal, setMeal] = useState(
        {
            name: "",
            category: "",
            recipe: null,
            ingredient_list: []
        }
    );

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
        //console.log('week array');
        //console.log(weekArr);
        return weekArr;
    }

    // handles the drag event
    function onDrag(event, recipe) {
        setDraggedRecipe(recipe);
        setMeal(
            {
                name: recipe["name"],
                category: "",
                recipe: recipe
            }
        );
        //console.log('meal in on drag:');
        //console.log(meal);
        event.preventDefault();
    }

    // handles the drag over event
    function onDragOver(event, row, col, category) {
        setMeal(
            {
                name: draggedRecipe.name,
                category: category,
                recipe: draggedRecipe
            }
        );
        //console.log('meal in on drag over:');
        //console.log(meal);
        document.getElementById('cell-content-' + row + '-' + col).innerHTML = meal['name'];
        event.preventDefault();
    }

    // handles the drag leave event
    function onDragLeave(event, row, col) {
        setMeal(
            {
                name: "",
                category: "",
                recipe: null
            }
        );
        document.getElementById('cell-content-' + row + '-' + col).innerHTML = null;
        event.preventDefault();
    }

    // handles the drop event
    function onDrop(event, d, y) {
        // update meal outline's meal list here
        const temp_date = y + "-" + abbrMonths[d.getMonth()] + "-" + d.getDate();
        //console.log('meal in on drop:');
        //console.log(meal);
        props.handleDrop(meal, temp_date);
        event.preventDefault();
    }

    return (
        <div>
            <h1>My Planner</h1>
            <h4>{yearView}</h4>

            <div>
                <div className='ptable'>
                    <div className='ptable-row'>
                        {props.mealData.map((row, index) => (
                            <div
                                className='ptable-cell'
                                key={row.id}
                                draggable
                                onDrag={event => onDrag(event, row)}>
                                <img src={row.image || '--'}
                                        alt={row.name}
                                        style={{width: 150,
                                                height: 100,
                                                objectFit: 'cover',
                                                position: 'center'}} />
                                <div className='text'>
                                    <div className='planner-subtitle'>
                                        {row.name}
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>

            <div className='control'>
                <button onClick={subWeek}>prev</button>
                <button onClick={addWeek}>next</button>
            </div>
            <div className='ptable'>
                <div className='ptable-row'>
                    <div className='ptable-head'></div>
                    {getWeek().map((element, index) => {
                        return (
                            <div className='ptable-head'>
                                {(abbrDays[element.getDay()] + " " + abbrMonths[element.getMonth()] + " " + element.getDate())}
                            </div>
                        );
                    })}
                </div>
                
                {mealCategories.map((category, row) => {
                    return (
                        <div className='ptable-row'>
                            <div className='ptable-head'>{category}</div>
                            {getWeek().map((day, col) => {
                                return (
                                    <div
                                        className='ptable-cell'
                                        key={day.id}
                                        onDrop={event => onDrop(event, day, yearView)}
                                        onDragOver={event => onDragOver(event, row, col, category)}
                                        onDragLeave={event => onDragLeave(event, row, col)}>
                                        <div id={'cell-content-' + row + '-' + col}>



                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
  
export default Planner;