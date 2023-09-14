import React, {useState} from 'react';
import './App.css';


function MealForm(props) {
    const [meal, setMeal] = useState({
        name: "",
        category: "",
        recipe: null,
        ingredient_list: []
    });

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === 'name') {
            setMeal({
                name: value,
                category: meal['category'],
                recipe: meal['recipe'],
                ingredient_list: meal['ingredient_list']
            });
        } else if (name === 'category') {
            setMeal({
                name: meal['name'],
                category: value,
                recipe: meal['recipe'],
                ingredient_list: meal['ingredient_list']
            });
        } else if (name === 'recipe') {
            setMeal({
                name: meal['name'],
                category: meal['category'],
                recipe: value,
                ingredient_list: meal['ingredient_list']
            });
        } else if (name === 'password') {
            setMeal({
                name: meal['name'],
                category: meal['category'],
                recipe: meal['recipe'],
                ingredient_list: value
            });
        }
    }

    function submitForm() {
        props.handleSubmit(meal);
    }


    return (
        <form className='meal-form'>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                value={meal.name}
                onChange={handleChange} />
            <label htmlFor="category">Category</label>
            <input
                type="text"
                name="category"
                id="category"
                value={meal.category}
                onChange={handleChange} />
            <label htmlFor="recipe">Recipe</label>
            <input
                type="text"
                name="recipe"
                id="recipe"
                value={meal.recipe}
                onChange={handleChange} />
            <label htmlFor="ingredient_list">Ingredient List</label>
            <input
                type="text"
                name="ingredient_list"
                id="ingredient_list"
                value={meal.ingredient_list}
                onChange={handleChange} />
            <input type="button" value="Submit" onClick={submitForm} />
        </form>
    );
}

export default MealForm;