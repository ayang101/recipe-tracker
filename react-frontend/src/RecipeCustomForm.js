import React, {useState} from 'react';
import Modal from 'react-modal';
import './App.css';

Modal.setAppElement('#root');

function RecipeURLForm(props) {
    //const [modalIsOpen, setIsOpen] = useState(false);
    //const [isSubmitURL, setIsSubmitURL] = useState(false);
    //const [tempRecipe, setTempRecipe] = useState(null);
    const [nameFilled, setNameFilled] = useState(true);
    const [rIsValid, setRIsValid] = useState(true);
    const [pIsValid, setPIsValid] = useState(true);
    const [cIsValid, setCIsValid] = useState(true);
    const [aIsValid, setAIsValid] = useState(true);

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
            instructions: ""
        }
    );

    /*
    function openModal(){
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    function submitURLForm(){
        setIsSubmitURL(true);
        var encodedURL = encodeURIComponent(recipe.source);
        setTempRecipe(recipe);
        props.handleSubmitURL(encodedURL);
        closeModal();
    }
    */

    /*
    function handleURLChange(event) {
        const { name, value } = event.target;
        if (name === "source") {
            setRecipe(
                {name: recipe['name'],
                 source: value,
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
    */

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "name") {
            setRecipe(
                {name: value,
                 source: recipe['source'],
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
        } else if (name === "source") {
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
        } else if (name === "image") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
                 author: recipe['author'],
                 image: value,
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
        } else if (name === "rating") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
                 author: recipe['author'],
                 image: recipe['image'],
                 rating: value,
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
        } else if (name === "course") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
                 author: recipe['author'],
                 image: recipe['image'],
                 rating: recipe['rating'],
                 course: value,
                 cuisine: recipe['cuisine'],
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
                 additionalTime: recipe['additionalTime'],
                 totalTime: recipe['totalTime'],
                 description: recipe['description'],
                 ingredient_list: recipe['ingredient_list'],
                 instructions: recipe['instructions']
                });
        } else if (name === "cuisine") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
                 author: recipe['author'],
                 image: recipe['image'],
                 rating: recipe['rating'],
                 course: recipe['course'],
                 cuisine: value,
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
                 additionalTime: recipe['additionalTime'],
                 totalTime: recipe['totalTime'],
                 description: recipe['description'],
                 ingredient_list: recipe['ingredient_list'],
                 instructions: recipe['instructions']
                });
        } else if (name === "prepTime") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
                 author: recipe['author'],
                 image: recipe['image'],
                 rating: recipe['rating'],
                 course: recipe['course'],
                 cuisine: recipe['cuisine'],
                 prepTime: value,
                 cookTime: recipe['cookTime'],
                 additionalTime: recipe['additionalTime'],
                 totalTime: recipe['totalTime'],
                 description: recipe['description'],
                 ingredient_list: recipe['ingredient_list'],
                 instructions: recipe['instructions']
                });
        } else if (name === "cookTime") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
                 author: recipe['author'],
                 image: recipe['image'],
                 rating: recipe['rating'],
                 course: recipe['course'],
                 cuisine: recipe['cuisine'],
                 prepTime: recipe['prepTime'],
                 cookTime: value,
                 additionalTime: recipe['additionalTime'],
                 totalTime: recipe['totalTime'],
                 description: recipe['description'],
                 ingredient_list: recipe['ingredient_list'],
                 instructions: recipe['instructions']
                });
        } else if (name === "additionalTime") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
                 author: recipe['author'],
                 image: recipe['image'],
                 rating: recipe['rating'],
                 course: recipe['course'],
                 cuisine: recipe['cuisine'],
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
                 additionalTime: value,
                 totalTime: recipe['totalTime'],
                 description: recipe['description'],
                 ingredient_list: recipe['ingredient_list'],
                 instructions: recipe['instructions']
                });
        } else if (name === "totalTime") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
                 author: recipe['author'],
                 image: recipe['image'],
                 rating: recipe['rating'],
                 course: recipe['course'],
                 cuisine: recipe['cuisine'],
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
                 additionalTime: recipe['additionalTime'],
                 totalTime: value,
                 description: recipe['description'],
                 ingredient_list: recipe['ingredient_list'],
                 instructions: recipe['instructions']
                });
        } else if (name === "description") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
                 author: recipe['author'],
                 image: recipe['image'],
                 rating: recipe['rating'],
                 course: recipe['course'],
                 cuisine: recipe['cuisine'],
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
                 additionalTime: recipe['additionalTime'],
                 totalTime: recipe['totalTime'],
                 description: value,
                 ingredient_list: recipe['ingredient_list'],
                 instructions: recipe['instructions']
                });
        } else if (name === "ingredient_list") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
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
                 ingredient_list: value,
                 instructions: recipe['instructions']
                });
        } else if (name === "instructions") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
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
                 instructions: value
                });
        }
    }

    function validateForm(){
        // check if the name is filled or not
        if (recipe.name.length === 0) {
            setNameFilled(false);
        }
        // check if the relevant fields are numbers or not
        if (isNaN(parseFloat(recipe.rating))
            || isNaN(parseInt(recipe.prepTime))
            || isNaN(parseInt(recipe.cookTime))
            || isNaN(parseInt(recipe.additionalTime))) {
            if(isNaN(parseFloat(recipe.rating))) {
                setRIsValid(false);
            }
            if(isNaN(parseInt(recipe.prepTime))) {
                setPIsValid(false);
            }
            if(isNaN(parseInt(recipe.cookTime))) {
                setCIsValid(false);
            }
            if(isNaN(parseInt(recipe.additionalTime))) {
                setAIsValid(false);
            }
        }

        // check if the relevant fields are within bounds or not
        if (!isNaN(parseFloat(recipe.rating))
            || !isNaN(parseInt(recipe.prepTime))
            || !isNaN(parseInt(recipe.cookTime))
            || !isNaN(parseInt(recipe.additionalTime))) {
            if(recipe.rating < 0 || recipe.rating > 10) {
                setRIsValid(false);
            }
            if(recipe.prepTime < 0) {
                setPIsValid(false);
            }
            if(recipe.cookTime < 0) {
                setCIsValid(false);
            }
            if(recipe.additionalTime < 0) {
                setAIsValid(false);
            }
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
        validateForm();
    }

    return (
        <>
        {/*
        <div>
            <h4>Import a recipe from a website</h4>
            <button onClick={openModal}>Import</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}>
                <button onClick={closeModal}>Close</button>
                <form>
                    <label htmlFor="source">Source</label>
                    <input
                        type="text"
                        name="source"
                        id="source"
                        value={recipe.source}
                        onChange={handleURLChange} />
                    <input type="button" value= "Submit" onClick={submitURLForm} />
                </form>
            </Modal> 
        </div>
        */}
        <form className='recipe-form'>
            <h4>Customize your own recipe below</h4>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                value={recipe.name || ''}
                onChange={handleChange} />
            {!nameFilled && <p className='error-field'>Name cannot be empty.</p>}

            <label htmlFor="author">Author</label>
            <input
                type="text"
                name="author"
                id="author"
                value={recipe.author || ''}
                onChange={handleChange} />

            <label htmlFor="image">Image</label>
            <input
                type="text"
                name="image"
                id="image"
                value={recipe.image || ''}
                onChange={handleChange} />

            <label htmlFor="rating">Rating</label>
            <input
                type="text"
                name="rating"
                id="rating"
                value={recipe.rating || ''}
                onChange={handleChange} />
            {!rIsValid && <p className='error-field'>Expected a number between 0 and 10 (inclusive).</p>}

            <label htmlFor="course">Course</label>
            <input
                type="text"
                name="course"
                id="course"
                value={recipe.course || ''}
                onChange={handleChange} />

            <label htmlFor="cuisine">Cuisine</label>
            <input
                type="text"
                name="cuisine"
                id="cuisine"
                value={recipe.cuisine || ''}
                onChange={handleChange} />

            <label htmlFor="prepTime">Prep Time (minutes)</label>
            <input
                type="text"
                name="prepTime"
                id="prepTime"
                value={recipe.prepTime || ''}
                onChange={handleChange} />
            {!pIsValid && <p className='error-field'>Expected a number greater than or equal to 0.</p>}

            <label htmlFor="cookTime">Cook Time (minutes)</label>
            <input
                type="text"
                name="cookTime"
                id="cookTime"
                value={recipe.cookTime || ''}
                onChange={handleChange} />
            {!cIsValid && <p className='error-field'>Expected a number greater than or equal to 0.</p>}
            

            <label htmlFor="additionalTime">Additional Time (minutes)</label>
            <input
                type="text"
                name="additionalTime"
                id="additionalTime"
                value={recipe.additionalTime || ''}
                onChange={handleChange} />
            {!aIsValid && <p className='error-field'>Expected a number greater than or equal to 0.</p>}

            {/*
            <label htmlFor="totalTime">Total Time</label>
            <input
                type="text"
                name="totalTime"
                id="totalTime"
                value={recipe.totalTime}
                onChange={handleChange} />
            */}

            <label htmlFor="description">Description</label>
            <input
                type="text"
                name="description"
                id="description"
                value={recipe.description || ''}
                onChange={handleChange} />

            <label htmlFor="ingredient_list">Ingredients</label>
            <input
                type="text"
                name="ingredient_list"
                id="ingredient_list"
                value={recipe.ingredient_list}
                onChange={handleChange} />

            <label htmlFor="instructions">Instructions</label>
            <input
                type="text"
                name="instructions"
                id="instructions"
                value={recipe.instructions}
                onChange={handleChange} />
            <input type="button" value= "Submit" onClick={submitForm} />
        </form>
        </>
    );
}

export default RecipeURLForm;