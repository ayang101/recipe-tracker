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
            ingredient_list: [],
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
                 ingredient_list: recipe['ingredient_list'],
                 instructions: recipe['instructions']
                });
        } else if (name === "source") {
            //result = extract(name)
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
                 category: recipe['category'],
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
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
                 category: recipe['category'],
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
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
                 category: recipe['category'],
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
                 totalTime: recipe['totalTime'],
                 description: recipe['description'],
                 ingredient_list: recipe['ingredient_list'],
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
                 category: recipe['category'],
                 prepTime: value,
                 cookTime: recipe['cookTime'],
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
                 category: recipe['category'],
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
                 category: recipe['category'],
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
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
                 category: recipe['category'],
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
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
                 category: recipe['category'],
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
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
                 category: recipe['category'],
                 prepTime: recipe['prepTime'],
                 cookTime: recipe['cookTime'],
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
            category: "",
            servingSize: "",
            prepTime: "",
            cookTime: "",
            totalTime: "",
            description: "",
            ingredient_list: [],
            instructions: ""
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

export default RecipeForm;