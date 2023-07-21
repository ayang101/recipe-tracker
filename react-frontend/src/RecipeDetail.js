import React from 'react'
import { useRef } from 'react';
import { useParams } from 'react-router-dom'


function RecipeDetail(props) {
    const savedRecipe = useRef(0);
    const recipeId = useParams().id;
    const currRecipe = props.recipeData.find(rec => {return rec._id === recipeId});
    if (currRecipe !== undefined) {
        savedRecipe.current = currRecipe;
    }

    return (
        <div>
            <h1>{savedRecipe.current.name}</h1>
            <p>Author: {savedRecipe.current.author}</p>
            <p>Source:
                <a href= {savedRecipe.current.source} target="_blank" rel="noopener noreferrer">
                    {savedRecipe.current.source}
                </a>
            </p>
            <p>Image:</p>
            <p>
                <img src={savedRecipe.current.image} 
                    alt=''
                    width="50%"/>
            </p>
            <p>Rating: {savedRecipe.current.rating}</p>
            <p>Course: {savedRecipe.current.course}</p>
            <p>Cuisine: {savedRecipe.current.cuisine}</p>
            <p>Servings: {savedRecipe.current.servingSize}</p>
            <p>Prep Time: {savedRecipe.current.prepTime}</p>
            <p>Cook Time: {savedRecipe.current.cookTime}</p>
            <p>Additional Time: {savedRecipe.current.additionalTime}</p>
            <p>Total Time: {savedRecipe.current.totalTime}</p>
            <p>Description: {savedRecipe.current.description}</p>
            <p>Ingredients: </p>
            <ul>
                {savedRecipe.current.ingredients?.map((element, index) => {
                    return(
                        <li key={index}>
                            {element}
                        </li>
                    );
                })}
            </ul>
            <p>Instructions:</p>
            <ol>
                {savedRecipe.current.instructions?.map((element, index) => {
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