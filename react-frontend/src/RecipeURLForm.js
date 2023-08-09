import React, {useState} from 'react';
import './App.css';

function RecipeURLForm(props) {
    const [isValidURL, setIsValidURL] = useState(true);
    const [recipe, setRecipe] = useState(
        {
            name: "",
            source: "",
            author: "",
            image: "",
            rating: "",
            course: "",
            cuisine: "",
            servingSize: "",
            prepTime: "",
            cookTime: "",
            additionalTime: "",
            totalTime: "",
            description: "",
            ingredient_list: [],
            instructions: []
        }
    );

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "source") {
            setRecipe(
                {name: recipe['name'],
                 source: value,
                 author: recipe['author'],
                 image: recipe['image'],
                 rating: recipe['rating'],
                 course: recipe['course'],
                 cuisine: recipe['cuisine'],
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
                 additionalTime: recipe['additionalTime'],
                 totalTime: recipe['totalTime'],
                 description: recipe['description'],
                 ingredient_list: recipe['ingredient_list'],
                 instructions: recipe['instructions']
                });
        }
    }

    function submitForm() {
        props.handleSubmit(recipe);
        setRecipe({
            name: "",
            source: "",
            author: "",
            image: "",
            rating: "",
            course: "",
            cuisine: "",
            servingSize: "",
            prepTime: "",
            cookTime: "",
            additionalTime: "",
            totalTime: "",
            description: "",
            ingredient_list: [],
            instructions: []
        });
        // some other condition indicates that recipe import failed
        if (!recipe.name) {
            setIsValidURL(false);
        }
    }

    return (
        <div className='body'>
            <form className='recipe-form'>
                <label htmlFor="source">Source</label>
                <input
                    type="text"
                    name="source"
                    id="source"
                    value={recipe.source}
                    onChange={handleChange} />
                {!isValidURL && <p className='error-field'>Recipe URL must be a valid URL.</p>}
                <input type="button" value= "Submit" onClick={submitForm} />
            </form>
        </div>
    );
}

export default RecipeURLForm;