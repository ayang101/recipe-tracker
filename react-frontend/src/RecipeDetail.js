import React from 'react'
import { useParams } from 'react-router-dom'


function RecipeDetail(props) {
    const {recipeId} = useParams();
    const currRecipe = props.recipeData.find(rec => rec.id === recipeId);

    return (
        <div>
            <h1>{currRecipe.name}</h1>
            <p>Source: ${currRecipe.source}</p>
            <p>Image: ${currRecipe.image}</p>
            <p>Rating: ${currRecipe.rating}</p>
            <p>Course: ${currRecipe.course}</p>
            <p>Category: ${currRecipe.category}</p>
            <p>Servings: ${currRecipe.servingSize}</p>
            <p>Prep Time: ${currRecipe.prepTime}</p>
            <p>Cook Time: ${currRecipe.cookTime}</p>
            <p>Total Time: ${currRecipe.totalTime}</p>
            <p>Description: ${currRecipe.description}</p>
            <p>Ingredients: ${currRecipe.ingredients}</p>
            <p>Instructions: ${currRecipe.instructions}</p>
        </div>
    )
}

export default RecipeDetail;