import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Routes, json } from 'react-router-dom';
import RecipeTable from './RecipeTable';
import RecipeURLForm from './RecipeURLForm';
import RecipeCustomForm from './RecipeCustomForm';
import RecipeDetail from './RecipeDetail';
import GroceryList from './GroceryList';
import Planner from './Planner';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Logout from './Logout';
import NavBar from './Nav';
import GuestNav from './GuestNav';
import Home from './Home';
import ErrorPage from './ErrorPage';
import PrivateRoutes from './PrivateRoutes';
import axios from 'axios';


function MyApp() { 
  //localStorage.setItem("savedMealPlan", []);
  //localStorage.setItem("savedPlannedMeals", []);
  const [currUser, setCurrUser] = useState(() => {
    // get stored value
    console.log('local storage saved user');
    const savedUser = (localStorage.getItem("savedUser")).toString().replace(/,+/g,',');
    console.log(savedUser);
    return savedUser ? savedUser : null;
  });
  const [recipes, setRecipes] = useState(() => {
    // get stored value
    console.log('local storage saved recipes');
    //console.log(localStorage.getItem("savedRecipes"));
    console.log((localStorage.getItem("savedRecipes")).toString().replace(/,+/g,','));
    var savedRecipes = null;
    if (localStorage.getItem("savedRecipes") !== null) {
      savedRecipes = (localStorage.getItem("savedRecipes")).toString().replace(/,+/g,',');
    }
    return savedRecipes ? savedRecipes : [];
  });
  const [currRecipe, setCurrRecipe] = useState(null);
  const [users, setUsers] = useState([]);
  const [mealOutlines, setMealOutlines] = useState(() => {
    console.log('local storage saved meal outlines');
    //console.log(localStorage.getItem("savedRecipes"));
    console.log((localStorage.getItem("savedMealPlan")).toString().replace(/,+/g,','));
    var savedMealOutlines = null;
    if (localStorage.getItem("savedMealPlan") !== null) {
      savedMealOutlines = (localStorage.getItem("savedMealPlan")).toString().replace(/,+/g,',');
    }
    return savedMealOutlines ? JSON.parse(savedMealOutlines) : [];
  });
  const [meals, setMeals] = useState([]);
  const [plannedMeals, setPlannedMeals] = useState(() => {
    var savedPlannedMeals = null;
    if (localStorage.getItem("savedPlannedMeals") !== null) {
      savedPlannedMeals = (localStorage.getItem("savedPlannedMeals")).toString().replace(/,+/g,',');
    }
    return savedPlannedMeals ? JSON.parse(savedPlannedMeals) : [];
  });
  const [isAuth, setIsAuth] = useState(() => {
    // get stored value
    const isValid = localStorage.getItem("isValid");
    if (isValid !== null) {
        return JSON.parse(isValid);
    }
    return false;
  });

  console.log('planned meals in app');
  console.log(plannedMeals);

  useEffect(() => {
    fetchAllRecipes().then( result => {
      if (result) {
        // transform each recipe into a meal
        const init_meals = [];
        for (var i=0; i<result.length; i++) {
          init_meals.push(
            {
              name: result[i].name,
              category: "",
              image: result[i].image,
              recipe: result[i],
              ingredient_list: []
            }
          );
        }
        setMeals(init_meals);
      }
    });
  }, [] );

  useEffect(() => {
    fetchMealPlan().then( result => {
      if (result) {
        setMealOutlines(mealOutlines);
      }
    });
  }, [] );

  async function fetchMealPlan(){
    try {
      const response = await axios.get('http://localhost:5000/meal-outlines');
      var temp_user = JSON.parse(currUser);
      console.log('users meal plan');
      console.log(temp_user.meal_plan);
      console.log('users meal plan length');
      console.log((temp_user.meal_plan).length);
      console.log('in backend');
      console.log(response.data.mealOutline_list);
      var temp = (response.data.mealOutline_list).filter((meal_outline, i) => {
        for (var j=0; j<(temp_user.meal_plan).length; j++) {
          if (temp_user.meal_plan[j] === meal_outline._id) {
            return temp_user.meal_plan[j];
          }
        }
      });
      console.log("current users' meal plan");
      setMealOutlines(temp);
      console.log('meal outlines');
      //localStorage.setItem("savedMealPlan", JSON.stringify(temp));
      console.log(temp);
      return temp;
    }
    catch (error) {
      // we're not handling errors. Just logging into the console
      console.log(error);
      return false;
    }
  }

  // makes the GET request through API on the backend
  // returns a user object
  async function fetchUser(){
    try {
      const response = await axios.get('http://localhost:5000/users');
      var temp_user = JSON.parse(currUser);
      var temp = response.data.users.filter((user, i) => {
        return user._id === temp_user._id;
      });
      console.log('current user id:');
      console.log(JSON.parse(currUser)._id);
      console.log('fetchUser');
      console.log(temp[0])
      return temp[0];
    }
    catch (error) {
      // we're not handling errors. Just logging into the console
      console.log(error);
      return false;
    }
  }

  function updateUserList(user) {
    makePostCallUser(user).then( result => {
      user = result.data;
      if (result && result.status === 201) {
        setUsers([...users, user]);
        for (var i=0; i<user.meal_plan.length; i++) {
          setMealOutlines([...mealOutlines, user.meal_plan.at(i)]);
        }
      }
    });
  }

  async function makePostCallUser(user){
    try {
      const response = await axios.post('http://localhost:5000/signup', user);
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  function authenticateUser(user) {
    authUser(user).then( result => {
      if (result && result.status === 200) {
        console.log('current user:');
        console.log(result.data);
        setCurrUser(JSON.stringify(result.data));
      }
    });
  }

  async function authUser(user) {
    try {
      const response = await axios.get(
        'http://localhost:5000/users/'
        + user.username + '/'
        + user.password);
      console.log(user.username);
      console.log(user.password);
      console.log(response.data.recipe_list);
      console.log(response.status);
      if (response.status !== 200 || response.data.length === 0) {
        localStorage.setItem("isValid", false);
        throw new Error('Invalid username or password.');
      } else {
        localStorage.setItem("isValid", true);
      }
      return response;
    }
    catch (error) {
      localStorage.setItem("isValid", false);
      console.log(error);
      // popup alert message
      //alert(error);
    }
  }

  window.onbeforeunload = (e) => {
    localStorage.setItem("savedUser", currUser);
    localStorage.setItem("savedRecipes", recipes);
    console.log('planned meals in app');
    console.log(plannedMeals);
    localStorage.setItem("savedPlannedMeals", JSON.stringify(plannedMeals));
    localStorage.setItem("savedMealPlan", JSON.stringify(mealOutlines));
  };

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
      console.log('result.data in updateList');
      console.log(recipe);
    if (result && result.status === 201)
      setRecipes([...recipes, recipe]);
    });
  }

  // makes the GET request through API on the backend
  // returns the data (list of recipes from the backend)
  async function fetchAllRecipes(){
    try {
      const response = await axios.get('http://localhost:5000/recipes');
      var temp = null;
      if (currUser !== null) {
        var temp_user = JSON.parse(currUser);
        console.log('response.data');
        console.log(response.data.recipes_list);
        console.log('all recipes');
        console.log(temp_user);
        temp = (response.data.recipes_list).filter((recipe, i) => {
          for (var j=0; j<(temp_user.recipe_list).length; j++) {
            return temp_user.recipe_list[j] === recipe._id; 
          }
        });
      }
      console.log("current users' recipes");
      localStorage.setItem("savedRecipes", JSON.stringify(temp));
      console.log(temp);
      return temp;
    }
    catch (error) {
      // we're not handling errors. Just logging into the console
      console.log(error);
      return false;
    }
  }

  async function fetchURLdata(url){
    try {
      const response = await axios.get('http://localhost:5000/recipes/custom/' + url);
      setCurrRecipe(response.data);
      return response.data;
    }
    catch (error) {
      // we're not handling errors. Just logging into the console
      console.log(error);
      return false;
    }
  }

  async function makePostCall(recipe){
    let isValidURL;
    try {
      // check if string is a valid URL
      let url = new URL(recipe.source);
      console.log('url: ' + url);
      isValidURL = true;
    } catch (error) {
      isValidURL = false
    }
    try {
      console.log('curr user id in makePostCall recipe');
      console.log(JSON.parse(currUser)._id);
      const response = await axios.post('http://localhost:5000/recipes',
                                        [recipe,
                                        isValidURL,
                                        JSON.parse(currUser)._id
                                        ]);
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

  useEffect(() => {
    fetchUser().then( result => {
      if (result) {
        console.log('result');
        console.log(result);
        setCurrUser(JSON.stringify(result));
      }
    });
  }, [] );

  function updateMealOutlineMealList(meal, date) {
    // check if the mealOutline exists for the given date
    var mealOutlineExists = false;
    for (var i; i < mealOutlines; i++) {
      var temp_meal = mealOutlines[i];
      if (temp_meal["date"] === date) {
        mealOutlineExists = true;
        break;
      }
    }
    console.log('date:');
    console.log(date);
    // if the meal_outline for that date is not found
    // create a new meal_outline
    var cont = true;
    if (!mealOutlineExists) {
      makePostCallMealOutline(date).then( result => {
        if (!(result) || !(result.status === 201)) {
          cont = false;
        }
      });
    }
    if (cont === true) {
    // add meal to meal_list of target mealOutline
      makePostCallMeal(date, meal).then( result => {
        var newMealOutline = (result.data)[0];
        console.log('new meal outline');
        console.log(newMealOutline);
        var newPlannedMeal = (result.data)[1];
        if (result && result.status === 201) {
          setPlannedMeals([...plannedMeals, newPlannedMeal]);
          setMealOutlines([...mealOutlines, newMealOutline]);
        }
      });
    }
  }

  async function makePostCallMealOutline(date){
    try {
      const new_meal_outline = (
        {
          date: date,
          meal_list: []
        }
      );
      const response = await axios.post('http://localhost:5000/meal-outlines',
                                        [new_meal_outline,
                                         JSON.parse(currUser)._id]);
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  async function makePostCallMeal(date, meal){
    try {
      console.log('meal in post:');
      console.log(meal);
      const response = await axios.post('http://localhost:5000/meal-outlines/' + date, meal);
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  function updateMealList(newMeal) {
    setMeals([...meals, newMeal]);
  }

  function removePlannedMeal(mealOutline, plannedMeal) {
    // remove planned meal
    var mo_size = (mealOutline.meal_list).length;
    makeDeleteCallPlannedMeal(mealOutline, plannedMeal).then( result => {
      if (result && result.status === 204) {
        const updated = plannedMeals.filter((planned_meal, i) => {
          return planned_meal._id !== plannedMeal._id;
        });
        setPlannedMeals(updated);
      }
    });

    // if removed meal is the last meal in meal outline, remove meal outline
    if (mo_size === 1) {
      makeDeleteCallMealOutline(mealOutline).then( result => {
        if (result && result.status === 204) {
          const updated = mealOutlines.filter((meal_outline, i) => {
            return meal_outline._id !== mealOutline._id;
          });
          setMealOutlines(updated);
        }
      });
    }
  }

  async function makeDeleteCallPlannedMeal(mealOutline, plannedMeal){
    try {
      const response = await axios.delete('http://localhost:5000/meal-outlines/' + mealOutline.date + '/' + plannedMeal._id);
      return response;
    }
    catch (error) {
      // we're not handling errors. Just logging into the console
      console.log(error);
      return false;
    }
  }

  async function makeDeleteCallMealOutline(mealOutline){
    try {
      const response = await axios.delete('http://localhost:5000/meal-outlines/' + JSON.parse(currUser)._id + '/' + mealOutline.date);
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
        {isAuth ? 
          <NavBar /> :
          <GuestNav />}
        <Routes>
          <Route element={<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
              <Route
                path="/recipes"
                element={
                  <RecipeTable
                    recipeData={recipes}
                    removeRecipe={removeOneRecipe}
                    currRecipe={currRecipe}
                  />
                }
              />
              <Route 
                path="/recipes/custom"
                element={<RecipeCustomForm
                          handleSubmitURL={fetchURLdata}
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
              <Route
                path="/grocery-list"
                element={<GroceryList />} />
              <Route
                path="/meal-planner"
                element={
                  <Planner
                    mealData={meals}
                    plannedMealData={plannedMeals}
                    mealOutlineData={mealOutlines}
                    handleDrop={updateMealOutlineMealList}
                    handleSubmitForm={updateMealList}
                    removePlannedMeal={removePlannedMeal}
                  />
                }
              />
              {console.log('isValid')}
              {console.log(localStorage.getItem("isValid"))}
              <Route
                path="/logout"
                element={<Logout />} />
              <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route
            path="/login"
            element={ <LoginForm
                      handleSubmit={authenticateUser}
                      isValid={localStorage.getItem("isValid")} />} />
          <Route
            path="/signup"
            element={<SignupForm
                      handleSubmit={updateUserList} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default MyApp;