import { useState } from 'react';
import Modal from 'react-modal';
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
    const [draggedMeal, setDraggedMeal] = useState(null);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isSubmitForm, setIsSubmitForm] = useState(false);
    const [newMeal, setNewMeal] = useState(
        {
            name: "",
            category: "",
            image: "",
            recipe: null,
            ingredient_list: []
        }
    );
    // styles for plannerContent
    var styles = '#plannerContent { display: inline-block; border-radius: 10px; border: 0.5px solid #999999; width: 150px; } \
                  #image { border-radius: 10px; float: left; margin: 5px; } \
                  #name { font-size: 10px; text-align: justify; overflow: hidden; }';

    function openModal(){
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    function submitForm(){
        setIsSubmitForm(true);
        props.handleSubmitForm(newMeal);
        closeModal();
    }

    function handleFormChange(event) {
        const { name, value } = event.target;
        if (name === 'name') {
            setNewMeal({
                name: value,
                category: newMeal['category'],
                image: newMeal['image'],
                recipe: newMeal['recipe'],
                ingredient_list: newMeal['ingredient_list']
            });
        } else if (name === 'category') {
            setNewMeal({
                name: newMeal['name'],
                category: value,
                image: newMeal['image'],
                recipe: newMeal['recipe'],
                ingredient_list: newMeal['ingredient_list']
            });
        } else if (name === 'image') {
            setNewMeal({
                name: newMeal['name'],
                category: newMeal['category'],
                image: value,
                recipe: newMeal['recipe'],
                ingredient_list: newMeal['ingredient_list']
            });
        } else if (name === 'recipe') {
            setNewMeal({
                name: newMeal['name'],
                category: newMeal['category'],
                image: newMeal['image'],
                recipe: value,
                ingredient_list: newMeal['ingredient_list']
            });
        } else if (name === 'ingredient_list') {
            setNewMeal({
                name: newMeal['name'],
                category: newMeal['category'],
                image: newMeal['image'],
                recipe: newMeal['recipe'],
                ingredient_list: value
            });
        }
    }

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
    function onDrag(event, meal) {
        setDraggedMeal(meal);
        //console.log('meal in on drag:');
        //console.log(meal);
        event.preventDefault();
    }

    // handles the drag over event
    function onDragOver(event, category, day) {
        setDraggedMeal(
            {
                name: draggedMeal.name,
                category: category,
                image: draggedMeal.image,
                recipe: draggedMeal.recipe
            }
        );
        //console.log('meal in on drag over:');
        //console.log(meal);
        var content = 
            `<div style="display: inline-block;
                        border-radius: 10px;
                        border: 0.5px solid #999999;
                        width: 150px;">
                <img src=${draggedMeal.recipe ? draggedMeal.image : "--"}
                    onError=${'this.style.display = "none"'}
                    alt=${draggedMeal.name}
                    width="80"
                    style="border-radius: 10px;
                            float: left;
                            margin: 5px;" />
                <p style="font-size: 10px;
                        text-align: justify;
                        overflow: hidden;">
                    ${draggedMeal.name}
                </p>
            </div>`;
        document.getElementById('cell-content-' + category + '-' + day).innerHTML = content;
        event.preventDefault();
    }

    // handles the drag leave event
    function onDragLeave(event, category, day) {
        setDraggedMeal(
            {
                name: "",
                category: "",
                image: "",
                recipe: null,
                ingredient_list: []
            }
        );
        document.getElementById('cell-content-' + category + '-' + day).innerHTML = null;
        event.preventDefault();
    }

    // handles the drop event
    function onDrop(event, d, y) {
        // update meal outline's meal list here
        const temp_date = y + "-" + abbrMonths[d.getMonth()] + "-" + d.getDate();
        //console.log('meal in on drop:');
        //console.log(meal);
        props.handleDrop(draggedMeal, temp_date);
        event.preventDefault();
    }

    function findMeal(year, day, category) {
        console.log('in find meal');
        console.log('props.mealOutlineData: ');
        console.log(props.mealOutlineData);
        console.log('type');
        console.log(typeof props.mealOutlineData);
        
        console.log('props.plannedMealData: ');
        console.log(props.plannedMealData);
        if (props.mealOutlineData) {
            for (var i=0; i<(props.mealOutlineData).length; i++) {
                var curr_mo = (props.mealOutlineData)[i];
                console.log('here');
                console.log(curr_mo.date);
                console.log((year + "-" + abbrMonths[day.getMonth()] + "-" + day.getDate()));
                if (curr_mo.date === (year + "-" + abbrMonths[day.getMonth()] + "-" + day.getDate())) {
                    var curr_m = curr_mo.meal_list;
                    var temp_lst = [];
                    console.log('got here');
                    for (var j=0; j<(curr_m.length); j++) {
                        // find the meal in planned meals
                        for (var k=0; k<(props.plannedMealData).length; k++) {
                            console.log('in here');
                            var curr_pmd = (props.plannedMealData)[k];
                            console.log(curr_pmd._id);
                            console.log(curr_m[j]);
                            if (curr_pmd._id === curr_m[j]) {
                                console.log(curr_pmd.category);
                                console.log(category);
                                if (curr_pmd.category === category) {
                                    console.log('got em');
                                    temp_lst.push(curr_pmd);
                                    console.log(temp_lst);
                                }
                            }
                        }
                    }
                    return temp_lst;
                }
            }
        }
        return [];
    }

    function findMealOutline(year, day) {
        if (props.mealOutlineData) {
            for (var i=0; i<(props.mealOutlineData).length; i++) {
                var curr_mo = (props.mealOutlineData)[i];
                if (curr_mo.date === (year + "-" + abbrMonths[day.getMonth()] + "-" + day.getDate())) {
                    return curr_mo;
                }
            }
        }
        return null;
    }

    return (
        <div>
            <h1>My Planner</h1>
            <h4>{yearView}</h4>

            <div>
                <div className='ptable'>
                    <div className='ptable-row'>
                        <div className='ptable-inner'>
                            {props.mealData.map((row, index) => (
                                <div
                                    className='ptable-cell'
                                    key={row.id}
                                    draggable="true"
                                    onDrag={event => onDrag(event, row)}>
                                    <img 
                                        draggable="false"
                                        src={(row.recipe && row.recipe.image)  || '--'}
                                        alt={row.name}
                                        style={{width: 150,
                                                height: 100,
                                                objectFit: 'cover',
                                                position: 'center'}} />
                                    <div className='text'
                                         draggable="false">
                                        <div className='planner-subtitle'
                                             draggable="false">
                                            {row.name}
                                        </div>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                        
                        <div>
                            <button onClick={openModal}>+</button>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}>
                                <button onClick={closeModal}>X</button>
                                <form>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={newMeal.name}
                                        onChange={handleFormChange} />
                                    <label htmlFor="recipe">Recipe (optional)</label>
                                    <input
                                        type="text"
                                        name="recipe"
                                        id="recipe"
                                        value={newMeal.recipe}
                                        onChange={handleFormChange} />
                                    <label htmlFor="ingredient_list">Ingredient List</label>
                                    <input
                                        type="text"
                                        name="ingredient_list"
                                        id="ingredient_list"
                                        value={newMeal.ingredient_list}
                                        onChange={handleFormChange} />
                                    <input type="button" value="Submit" onClick={submitForm} />
                                </form>
                            </Modal> 
                        </div>

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
                                        onDragOver={event => onDragOver(event, category, day)}
                                        onDragLeave={event => onDragLeave(event, category, day)}>
                                        <div id={'cell-content-' + category + '-' + day}>
                                            {/*{console.log('meal outline data')}
                                            {console.log(props.mealOutlineData)}
                                            {console.log('findMeal')}
                                            {console.log(findMeal(yearView, day, category))}
                                            {console.log('planned meal data')}
                                            {console.log(props.plannedMealData)}*/}
                                            {props.mealOutlineData ? ((findMeal(yearView, day, category)).map((plannedMeal, num) => {
                                                return (
                                                    <>
                                                        <style>
                                                            { styles }
                                                        </style>
                                                        <div id="plannerContent">
                                                            <div className='remove-plannedMeal'>
                                                                {console.log('day id:')}
                                                                {console.log(abbrDays[day.getDay()] + " " + abbrMonths[day.getMonth()] + " " + day.getDate())}
                                                                {console.log('plannedMeal id:')}
                                                                {console.log(plannedMeal._id)}
                                                                <button onClick={() => props.removePlannedMeal(findMealOutline(yearView, day), plannedMeal)}>x</button>
                                                            </div>
                                                            {console.log('recipe image')}
                                                            {console.log(plannedMeal.image)}
                                                            <img id="image"
                                                                 src={plannedMeal.recipe ? plannedMeal.image : "--"}
                                                                 onError={'this.style.display = "none"'}
                                                                 alt={plannedMeal.name}
                                                                 width="80" />
                                                            <p id="name">
                                                                {plannedMeal.name}
                                                            </p>
                                                        </div>
                                                    </>
                                                );
                                            })) : <h4>nothing so far</h4>}


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