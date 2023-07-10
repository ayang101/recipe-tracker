import React, {useState} from 'react';

function RecipeURLForm(props) {
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
            instructions: []
        }
    );

    function handleChange(event) {
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
    );
}

export default RecipeURLForm;