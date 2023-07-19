import React from 'react'
import { Link } from "react-router-dom";
import {useState} from 'react';
import './App.css';


function RecipeTableHeader()  {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Image</th>
          <th>Rating</th>
          <th>Course</th>
          <th>Category</th>
          <th>Total Time</th>
        </tr>
      </thead>
    );
}

function RecipeTableBody(props) {
  const [query, setQuery] = useState("");
    return (
      <>
      <div>
          <input placeholder='Enter query'
                 onChange={event => setQuery(event.target.value)} />
      </div>
      <tbody>
      {
        props.recipeData.filter(row => {
          if (query === '') {
            return row;
          } else if (row.name.toLowerCase().includes(query.toLowerCase())) {
            return row;
          }
          return false;
        }).map((row, index) => (
          <div className='box'>
            <tr key={index}>
              <td>
                <Link to={`/recipes/${row._id}` }>
                  {row.name || '--'}
                </Link>
              </td>
              <td><img src={row.image || '--'} alt="" width="25%"/></td>
              <td>{row.rating || '--'}</td>          
              <td>{row.course  || '--'}</td>
              <td>{row.cuisine || '--'}</td>
              <td>{row.totalTime || '--'}</td>
              <td>
                <button onClick={() => props.removeRecipe(index)}>Delete</button>
              </td>
            </tr>
          </div>
        ))
      }
      </tbody>
      </>
    );
}

function RecipeTable(props) {
    return (
      <table className='recipe-table'>
        <RecipeTableHeader />
        <RecipeTableBody recipeData={props.recipeData}
                          removeRecipe={props.removeRecipe} />
      </table>
    );
}

export default RecipeTable;