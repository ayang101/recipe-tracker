import React from 'react'

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
    const rows = props.recipeData.map((row, index) => {
    return (
        <tr key={index}>
          <td>{row.name}</td>
          <td>{row.image}</td>
          <td>{row.rating}</td>          
          <td>{row.course}</td>
          <td>{row.category}</td>
          <td>{row.totalTime}</td>
          <td>
            <button onClick={() => props.removeRecipe(index)}>Delete</button>
          </td>
        </tr>
    );
    }
    );
    return (
        <tbody>
        {rows}
        </tbody>
    );
}

function RecipeTable(props) {
    return (
        <table>
          <RecipeTableHeader />
          <RecipeTableBody recipeData={props.recipeData}
                           removeRecipe={props.removeRecipe} />
        </table>
    );
}

export default RecipeTable;