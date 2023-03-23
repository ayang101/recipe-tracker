import React, {useState} from 'react';

function RecipeForm(props) {
    const [recipe, setRecipe] = useState(
        {
            name: "",
            source: "",
            image: "",
            rating: "",
            course: "",
            category: "",
            servingSize: "",
            prepTime: "",
            cookTime: "",
            totalTime: "",
            description: "",
            ingredients: "",
            instructions: ""
        }
    );

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "name") {
            setRecipe(
                {name: value,
                 source: recipe['source'],
                 image: recipe['image'],
                 rating: recipe['rating'],
                 course: recipe['course'],
                 category: recipe['category'],
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
                 totalTime: recipe['totalTime'],
                 description: recipe['description'],
                 ingredients: recipe['ingredients'],
                 instructions: recipe['instructions']
                });
        } else if (name === "source") {
            setRecipe(
                {name: recipe['name'],
                 source: value,
                 image: recipe['image'],
                 rating: recipe['rating'],
                 course: recipe['course'],
                 category: recipe['category'],
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
                 totalTime: recipe['totalTime'],
                 description: recipe['description'],
                 ingredients: recipe['ingredients'],
                 instructions: recipe['instructions']
                });
        } else if (name === "image") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
                 image: value,
                 rating: recipe['rating'],
                 course: recipe['course'],
                 category: recipe['category'],
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
                 totalTime: recipe['totalTime'],
                 description: recipe['description'],
                 ingredients: recipe['ingredients'],
                 instructions: recipe['instructions']
                });
        } else if (name === "rating") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
                 image: recipe['image'],
                 rating: value,
                 course: recipe['course'],
                 category: recipe['category'],
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
                 totalTime: recipe['totalTime'],
                 description: recipe['description'],
                 ingredients: recipe['ingredients'],
                 instructions: recipe['instructions']
                });
        } else if (name === "course") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
                 image: recipe['image'],
                 rating: recipe['rating'],
                 course: value,
                 category: recipe['category'],
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
                 totalTime: recipe['totalTime'],
                 description: recipe['description'],
                 ingredients: recipe['ingredients'],
                 instructions: recipe['instructions']
                });
        } else if (name === "category") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
                 image: recipe['image'],
                 rating: recipe['rating'],
                 course: recipe['course'],
                 category: value,
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
                 totalTime: recipe['totalTime'],
                 description: recipe['description'],
                 ingredients: recipe['ingredients'],
                 instructions: recipe['instructions']
                });
        } else if (name === "prepTime") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
                 image: recipe['image'],
                 rating: recipe['rating'],
                 course: recipe['course'],
                 category: recipe['category'],
                 prepTime: value,
                 cookTime: recipe['cookTime'],
                 totalTime: recipe['totalTime'],
                 description: recipe['description'],
                 ingredients: recipe['ingredients'],
                 instructions: recipe['instructions']
                });
        } else if (name === "cookTime") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
                 image: recipe['image'],
                 rating: recipe['rating'],
                 course: recipe['course'],
                 category: recipe['category'],
                 prepTime: recipe['prepTime'],
                 cookTime: value,
                 totalTime: recipe['totalTime'],
                 description: recipe['description'],
                 ingredients: recipe['ingredients'],
                 instructions: recipe['instructions']
                });
        } else if (name === "totalTime") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
                 image: recipe['image'],
                 rating: recipe['rating'],
                 course: recipe['course'],
                 category: recipe['category'],
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
                 totalTime: value,
                 description: recipe['description'],
                 ingredients: recipe['ingredients'],
                 instructions: recipe['instructions']
                });
        } else if (name === "description") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
                 image: recipe['image'],
                 rating: recipe['rating'],
                 course: recipe['course'],
                 category: recipe['category'],
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
                 totalTime: recipe['totalTime'],
                 description: value,
                 ingredients: recipe['ingredients'],
                 instructions: recipe['instructions']
                });
        } else if (name === "ingredients") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
                 image: recipe['image'],
                 rating: recipe['rating'],
                 course: recipe['course'],
                 category: recipe['category'],
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
                 totalTime: recipe['totalTime'],
                 description: recipe['description'],
                 ingredients: value,
                 instructions: recipe['instructions']
                });
        } else if (name === "instructions") {
            setRecipe(
                {name: recipe['name'],
                 source: recipe['source'],
                 image: recipe['image'],
                 rating: recipe['rating'],
                 course: recipe['course'],
                 category: recipe['category'],
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
                 totalTime: recipe['totalTime'],
                 description: recipe['description'],
                 ingredients: recipe['ingredients'],
                 instructions: value
                });
        }
    }

    function submitForm() {
        props.handleSubmit(person);
        setRecipe({
            name: "",
            source: "",
            image: "",
            rating: "",
            course: "",
            category: "",
            servingSize: "",
            prepTime: "",
            cookTime: "",
            totalTime: "",
            description: "",
            ingredients: "",
            instructions: ""
        });
    }

    return (
        <form>
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
            <label htmlFor="category">Category</label>
            <input
                type="text"
                name="category"
                id="category"
                value={recipe.category}
                onChange={handleChange} />
            <label htmlFor="servingSize">Serving Size</label>
            <input
                type="text"
                name="servingSize"
                id="servingSize"
                value={recipe.servingSize}
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
            <label htmlFor="ingredients">Ingredients</label>
            <input
                type="text"
                name="ingredients"
                id="ingredients"
                value={recipe.ingredients}
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
    );
}

export default RecipeForm;