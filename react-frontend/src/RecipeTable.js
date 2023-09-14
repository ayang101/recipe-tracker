import React from 'react';
import { Link } from "react-router-dom";
import {useState} from 'react';
import StarRatings from 'react-star-ratings';
import Select from 'react-select';
import './App.css';


function RecipeTableBody(props) {
  const [query, setQuery] = useState("");
  const [sortType, setSortType] = useState("");
  const options = [
    { value: 'name', label: 'Name (a-z)' },
    { value: 'rating_a', label: 'Rating (ascend)' },
    { value: 'rating_d', label: 'Rating (descend)' },
    { value: 'totalTime_a', label: 'Total Time (ascend)' },
    { value: 'totalTime_d', label: 'Total Time (descend)' }
  ];
    return (
      <div className='body'>
        <div className='controls'>
          <input className='search-bar'
                placeholder='Enter query'
                onChange={event => setQuery(event.target.value)} />
          <Select onChange={event =>setSortType(event.value)}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      width: 200,
                      float: 'left',
                      position: 'static'
                    }),
                  }}
                  options={options} />
            <div className='add-btn'>
              <Link className="url" to="/recipes/import">URL</Link>
              <Link className="custom" to="/recipes/custom">Custom</Link>
            </div>
        </div>
        <div id='table'>
        {
          JSON.parse(props.recipeData).filter(row => {
            if (query === '') {
              return row;
            } else if (row.name.toLowerCase().includes(query.toLowerCase())) {
              return row;
            }
            return false;
          }).sort((a, b) =>
            {
              if (sortType.includes('totalTime')) {
                var temp = sortType.split('_');
                var a_time = 0;
                var b_time = 0;
                var temp_a = a[temp[0]].split(' ');
                var temp_b = b[temp[0]].split(' ');

                // extract times for a
                for (var i=0; i<temp_a.length; i++) {
                  if (temp_a[i].includes('minute')) {
                    a_time += parseInt(temp_a[i - 1]) * 0.01;
                  }
                  if (temp_a[i].includes('hour')) {
                    a_time += parseInt(temp_a[i - 1]);
                  }
                }

                // extract times for b
                for (var j=0; j<temp_b.length; j++) {
                  if (temp_b[j].includes('minute')) {
                    b_time += parseInt(temp_b[j - 1]) * 0.01;
                  }
                  if (temp_b[j].includes('hour')) {
                    b_time += parseInt(temp_b[j - 1]);
                  }
                }
                if (sortType === 'totalTime_a') {
                  if (b_time > a_time) {
                    return -1;
                  }
                  return 1;
                } else {
                  if (b_time > a_time) {
                    return 1;
                  }
                  return -1;
                }
              } else if (sortType.includes('rating')) {
                if (sortType === 'rating_a') {
                  if (b[sortType] > a[sortType]) {
                    return -1;
                  }
                  return 1;
                } else {
                  if (b[sortType] > a[sortType]) {
                    return 1;
                  }
                  return -1;
                }
              } else {
                if (b[sortType] > a[sortType]) {
                  return -1;
                }
                return 1;
              }
            }
          ).map((row, index) => (
            <div className='tr' key={index}>
              <Link to={`/recipes/${row._id}` }>
                <img src={row.image || '--'}
                      alt="Visual Representation of Recipe"
                      style={{width: 250,
                              height: 200,
                              objectFit: 'cover',
                              position: 'center'}} />
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
                  <div className='td total-time'>{row.totalTime || '--'}</div>
                </div>
              </Link>
              {/*
              <div className='td'>
                <button onClick={() => props.removeRecipe(index)}>Delete</button>
              </div>
            */}
            </div>
          ))
        }
        </div>
      </div>
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