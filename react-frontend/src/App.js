import React, {useState, useEffect} from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import RecipeTable from './RecipeTable';
import RecipeURLForm from './RecipeURLForm';
import RecipeCustomForm from './RecipeCustomForm';
import RecipeDetail from './RecipeDetail'
import NavBar from './Nav';
import Home from './Home';
import ErrorPage from './ErrorPage';
import axios from 'axios';


function MyApp() { 
  const [recipes, setRecipes] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetchAll().then( result => {
      if (result)
        setRecipes(result);
    });
  }, [] );

  function removeOneRecipe (index) {
    makeDeleteCall(index).then( result => {
      if (result && result.status === 204) {
        const updated = recipes.filter((recipe, i) => {
          return i !== index
        });
        setRecipes(updated);
      }
    });
  }

  function updateList(recipe) {
    makePostCall(recipe).then( result => {
      recipe = result.data;
    if (result && result.status === 201)
      setRecipes([...recipes, recipe]);
    });
  }

  // makes the GET request through API on the backend
  // returns the data (list of recipes from the backend)
  async function fetchAll(){
    try {
      const response = await axios.get('http://localhost:5000/recipes');
      return response.data.recipes_list;
    }
    catch (error) {
      // we're not handling errors. Just logging into the console
      console.log(error);
      return false;
    }
  }

  async function makePostCall(recipe){
    try {
      const response = await axios.post('http://localhost:5000/recipes', recipe);
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makeDeleteCall(index){
    try {
      var id = recipes[index]._id
      const response = await axios.delete('http://localhost:5000/recipes/' + id);
      return response;
    }
    catch (error) {
      // we're not handling errors. Just logging into the console
      console.log(error);
      return false;
    }
  }

  return (
    <div className="container">
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route
              path="/recipes"
              element={
                <RecipeTable
                  recipeData={recipes}
                  removeRecipe={removeOneRecipe}
                />
              }
            />
            <Route 
              path="/recipes/custom"
              element={<RecipeCustomForm 
                         handleSubmit={updateList} />} />
            <Route 
              path="/recipes/import"
              element={<RecipeURLForm 
                         handleSubmit={updateList} />} />
            <Route
              path="/recipes/:id"
              element={
                <RecipeDetail
                  recipeData={recipes}
                />
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default MyApp;