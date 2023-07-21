import React from 'react'
import { Link } from "react-router-dom";
import {useState} from 'react';
import StarRatings from 'react-star-ratings'
import Select from 'react-select'
import './App.css';


function RecipeTableBody(props) {
  const [query, setQuery] = useState("");
  const [sortType, setSortType] = useState("");
  const options = [
    { value: 'recent', label: 'Recent' },
    { value: 'name', label: 'Name' },
    { value: 'rating', label: 'Rating' }
  ];
    return (
      <>
      <div className='controls'>
          <input placeholder='Enter query'
                 onChange={event => setQuery(event.target.value)} />
          <Select styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      width: 200,
                      float: 'right',
                      position: 'static'
                    }),
                  }}
                  options={options} />
      </div>
      <div id='table'>
      {
        props.recipeData.filter(row => {
          if (query === '') {
            return row;
          } else if (row.name.toLowerCase().includes(query.toLowerCase())) {
            return row;
          }
          return false;
        }).map((row, index) => (
          <div className='tr' key={index}>
            <Link to={`/recipes/${row._id}` }>
              <img src={row.image || '--'}
                    alt="Visual Representation of Recipe"
                    style={{objectFit: 'cover',
                            margin: 0,
                            width: 100 + '%'}} />
              <div className='text'>
                <div className='td name'>
                    {row.name || '--'}
                </div>
                <div className='td rating'>
                  <StarRatings
                    rating={row.rating || 0}
                    starDimension='25px'
                    starSpacing='2px'
                  />
                </div>
                {console.log(row.author)}
                <div className='td total-time'>{row.totalTime || '--'}</div>
                <div className='td author'>{row.author || '--'}</div>
              </div>
            </Link>
            <div className='td'>
              <button onClick={() => props.removeRecipe(index)}>Delete</button>
            </div>
          </div>
        ))
      }
      </div>
      </>
    );
}

function RecipeTable(props) {
    return (
      <div>
        <RecipeTableBody recipeData={props.recipeData}
                          removeRecipe={props.removeRecipe} />
      </div>
    );
}

export default RecipeTable;