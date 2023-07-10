import React, {useState} from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function RecipeURLForm(props) {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [recipe, setRecipe] = useState(
        {
            name: "",
            source: "",
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

    function openModal(){
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "name") {
            setRecipe(
                {name: value,
                 source: recipe['source'],
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
                 image: recipe['image'],
                 rating: recipe['rating'],
                 course: recipe['course'],
                 cuisine: recipe['cuisine'],
                 prepTime: recipe['prepTime'],
                 cookTime: value,
                 totalTime: recipe['totalTime'],
                 description: recipe['description'],
                 ingredient_list: recipe['ingredient_list'],
                 instructions: recipe['instructions']
                });
        } else if (name === "totalTime") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
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

    function submitForm() {
        props.handleSubmit(recipe);
        setRecipe({
            name: "",
            source: "",
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
    }

    return (
        <>
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
                        onChange={handleChange} />
                    <input type="button" value= "Submit" onClick={submitForm} />
                </form>
            </Modal> 
        </div>
        <form>
            <h4>Or customize one below</h4>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                value={recipe.name}
                onChange={handleChange} />

            <label htmlFor="source">Source</label>
            <input
                type="text"
                name="source"
                id="source"
                value={recipe.source}
                onChange={handleChange} />

            <label htmlFor="image">Image</label>
            <input
                type="text"
                name="image"
                id="image"
                value={recipe.image}
                onChange={handleChange} />

            <label htmlFor="rating">Rating</label>
            <input
                type="text"
                name="rating"
                id="rating"
                value={recipe.rating}
                onChange={handleChange} />

            <label htmlFor="course">Course</label>
            <input
                type="text"
                name="course"
                id="course"
                value={recipe.course}
                onChange={handleChange} />

            <label htmlFor="cuisine">Cuisine</label>
            <input
                type="text"
                name="cuisine"
                id="cuisine"
                value={recipe.cuisine}
                onChange={handleChange} />

            <label htmlFor="prepTime">Prep Time</label>
            <input
                type="text"
                name="prepTime"
                id="prepTime"
                value={recipe.prepTime}
                onChange={handleChange} />

            <label htmlFor="cookTime">Cook Time</label>
            <input
                type="text"
                name="cookTime"
                id="cookTime"
                value={recipe.cookTime}
                onChange={handleChange} />

            <label htmlFor="additionalTime">Additional Time</label>
            <input
                type="text"
                name="additionalTime"
                id="additionalTime"
                value={recipe.additionalTime}
                onChange={handleChange} />

            <label htmlFor="totalTime">Total Time</label>
            <input
                type="text"
                name="totalTime"
                id="totalTime"
                value={recipe.totalTime}
                onChange={handleChange} />

            <label htmlFor="description">Description</label>
            <input
                type="text"
                name="description"
                id="description"
                value={recipe.description}
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