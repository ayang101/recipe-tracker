import React from 'react'
import { useParams } from 'react-router-dom'


function RecipeDetail(props) {
    const recipeId = useParams().id;
    const currRecipe = props.recipeData.find(rec => {return rec._id === recipeId});

    return (
        <div>
            <h1>{currRecipe.name}</h1>
            <p>Source:
                <a href= {currRecipe.source} target="_blank">
                    {currRecipe.source}
                </a>
            </p>
            <p>Image:</p>
            <p><a href= {currRecipe.source} target="_blank">
                <img src={currRecipe.image} 
                    alt="Photo of recipe"
                    width="50%"/>
            </a></p>
            <p>Rating: {currRecipe.rating}</p>
            <p>Course: {currRecipe.course}</p>
            <p>Cuisine: {currRecipe.cuisine}</p>
            <p>Servings: {currRecipe.servingSize}</p>
            <p>Prep Time: {currRecipe.prepTime}</p>
            <p>Cook Time: {currRecipe.cookTime}</p>
            <p>Additional Time: {currRecipe.additionalTime}</p>
            <p>Total Time: {currRecipe.totalTime}</p>
            <p>Description: {currRecipe.description}</p>
            <p>Ingredients: </p>
            <ul>
                {currRecipe.ingredients.map((element, index) => {
                    return(
                        <li key={index}>
                            {element}
                        </li>
                    );
                })}
            </ul>
            <p>Instructions:</p>
            <ol>
                {currRecipe.instructions.map((element, index) => {
                    return(
                        <li key={index}>
                            {element}
                        </li>
                    );
                })}
            </ol>
        </div>
    )
}

export default RecipeDetail;