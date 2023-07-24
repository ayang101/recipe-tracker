import React from 'react'
import { useRef } from 'react';
import { useParams } from 'react-router-dom'
import './App.css';

function RecipeDetail(props) {
    const savedRecipe = useRef(0);
    const recipeId = useParams().id;
    const currRecipe = props.recipeData.find(rec => {return rec._id === recipeId});
    if (currRecipe !== undefined) {
        savedRecipe.current = currRecipe;
    }

    return (
        <div className='recipe-detail'>
            <div className='recipe-image'
                 style={{ backgroundImage: `url("${savedRecipe.current.image}")`,
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          width: 1210,
                          height: 300}}>
                <div className='btn-container'>
                    <button>Start Cooking</button>
                </div>
            </div>
            <div className='recipe-source'>
                <a href= {savedRecipe.current.source} target="_blank" rel="noopener noreferrer">
                    Visit Source
                </a>
            </div>
            <div className='recipe-name'>
                <h1>{savedRecipe.current.name}</h1>
            </div>
            <ul className='recipe-type'>
                <li>{savedRecipe.current.course || '--'}</li>
                <li>{savedRecipe.current.cuisine || '--'}</li>
                <li>{savedRecipe.current.rating || '--'}/10</li>
            </ul>
            <table className='recipe-times'>
                <tr>
                    <td>Servings:</td>
                    <td>Prep Time:</td>
                    <td>Cook Time:</td>
                    <td>Additional Time:</td>
                    <td>Total Time:</td>
                </tr>
                <tr>
                    <td>{savedRecipe.current.servingSize || '--'}</td>
                    <td>{savedRecipe.current.prepTime || '--'}</td>
                    <td>{savedRecipe.current.cookTime || '--'}</td>
                    <td>{savedRecipe.current.additionalTime || '--'}</td>
                    <td>{savedRecipe.current.totalTime || '--'}</td>
                </tr>
            </table>
            <div className='recipe-desc'>
                <p>{savedRecipe.current.description}</p>
            </div>
            {/*
            <ul className='recipe-ingr-header'>
                <li>Ingredients:</li>
                <div className='scale-convert'>
                    <li>Scale or Convert</li>
                </div>
            </ul>
            */}
            <p className='recipe-ingr-header'>Ingredients:</p>
            <table>
                {savedRecipe.current.ingredients?.map((element, index) => {
                    return(
                        <tr key={index}>
                            <td>{element}</td>
                        </tr>
                    );
                })}
            </table>
            <p className='recipe-instr-header'>Instructions:</p>
            <table>
                <ol>
                    {savedRecipe.current.instructions?.map((element, index) => {
                        return(
                            <tr>
                                <td>
                                    <li key={index}>
                                        {element}
                                    </li>
                                </td>
                            </tr>
                        );
                    })}
                </ol>
            </table>
        </div>
    )
}

export default RecipeDetail;