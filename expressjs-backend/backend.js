const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

const userServices = require('./models/user-services');
const recipeServices = require('./models/recipe-services');
const ingredientServices = require('./models/ingredient-services');
const mealOutlineServices = require('./models/mealOutline-services');
const mealServices = require('./models/meal-services');
const groceryListServices = require('./models/grocerylist-services');
const groceryItemServices = require('./models/groceryItem-services');

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
   res.send("Hello World!");
 });
 
// users
app.post("/users", async (req, res) => {
  const user = req.body;
  const savedUser = await userServices.addUser(user);
  if (savedUser) res.status(201).send(savedUser);
  else res.status(500).end();
});

app.get("/users", async (req, res) => {
  const name = req.query["name"];
  const email = req.query["email"];
  const username = req.query["username"];
  const meal_plan = req.query["meal_plan"];
  const recipe_list = req.query["recipe_list"];
  try {
    const result = await userServices.getUsers(
      name,
      email,
      username,
      meal_plan,
      recipe_list
    );
    res.send({ users: result });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

/* referenced from:
   https://www.geeksforgeeks.org/login-form-using-node-js-and-mongodb/ */
app.get("/users/:username/:password", async (req, res) => {
  try {
    const username = req.params["username"];
    const password = req.params["password"];
    // check if username belongs to a user
    console.log('username: ' + username);
    console.log('password: ' + password);
    const result = await userServices.verifyUser(username, password);
    if (result !== false) {
      res.status(200).send(result);
    } else {
      res.status(404).send("User doesn't exist");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

 // recipes
 app.get("/recipes", async (req, res) => {
   const name = req.query["name"];
   const source = req.query["source"];
   const author = req.query["author"];
   const image = req.query["image"];
   const rating = req.query["rating"];
   const course = req.query["course"];
   const cuisine = req.query["cuisine"];
   const servingSize = req.query["servingSize"];
   const prepTime = req.query["prepTime"];
   const cookTime = req.query["cookTime"];
   const additionalTime = req.query["additionalTime"];
   const totalTime = req.query["totalTime"];
   const description = req.query["description"];
   const instructions = req.query["instructions"];
   const ingredients = req.query["ingredients"];
   try {
    const result = await recipeServices.getRecipes(
      name,
      source,
      author,
      image,
      rating,
      course,
      cuisine,
      servingSize,
      prepTime,
      cookTime,
      additionalTime,
      totalTime,
      description,
      instructions,
      ingredients,
    );
    res.send({ recipes_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error ocurred in the server.');
  }
 });
 
 app.get("/recipes/:id", async (req, res) => {
  const id = req.params["id"];
  let result = await recipeServices.findRecipeById(id);
  if (result === undefined || result === null) {
    res.status(404).send("Resource not found.");
  } else {
    result = { recipes_list: result };
    res.send(result);
  }
 });
 
 app.delete("/recipes/:id", async (req, res) => {
   const id = req.params["id"];
   if (deleteRecipeById(id)) res.status(204).end();
   else res.status(404).send("Resource not found.");
 });

 async function deleteRecipeById(id) {
  try {
    if (await recipeServices.deleteRecipe(id)) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

app.get("/recipes/custom/:url", async (req, res) => {
  var source = req.params["url"];

  // reference:
  // https://stackoverflow.com/questions/22337446/how-to-wait-for-a-child-process-to-finish-in-node-js
  const execSync = require("child_process").execSync;
  const result = execSync("python scrape.py " + source);
  console.log('result: ');
  console.log(result);

  var dataToSend;
  dataToSend = result.toString();
  // replace single quote with double quote
  dataToSend = dataToSend.replace(/'/g, '"');
  dataToSend = dataToSend.replace('None', '""');
  recipe_obj = JSON.parse(dataToSend);
  // usage found in:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI
  recipe_obj.source = decodeURIComponent(recipe_obj.source);
  recipe_obj.image = decodeURIComponent(recipe_obj.image);
  recipe_obj.description = decodeURIComponent(recipe_obj.description);

  const savedRecipe = await recipeServices.getRecipeObject(recipe_obj);
  if (savedRecipe) res.send(savedRecipe);
  else res.status(500).end();
 });
 
 app.post("/recipes", async (req, res) => {
  var recipe = req.body[0];
  var extractURLData = req.body[1];

  if (extractURLData === true) {
    // reference:
    // https://stackoverflow.com/questions/22337446/how-to-wait-for-a-child-process-to-finish-in-node-js
    const execSync = require("child_process").execSync;
    const result = execSync("python scrape.py " + recipe.source);
    console.log('result: ');
    console.log(result);

    var dataToSend;
    dataToSend = result.toString();
    // replace single quote with double quote
    dataToSend = dataToSend.replace(/'/g, '"');
    dataToSend = dataToSend.replace('None', '""');
    recipe_obj = JSON.parse(dataToSend);
    // usage found in:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURI
    recipe_obj.source = decodeURIComponent(recipe_obj.source);
    recipe_obj.image = decodeURIComponent(recipe_obj.image);
    recipe_obj.description = decodeURIComponent(recipe_obj.description);
    recipe = recipe_obj;
  }

  const savedRecipe = await recipeServices.addRecipe(recipe);
  // update user recipe_list
  console.log('req.body[2] inside backend');
  console.log(req.body);
  const savedUser = await userServices.findAndUpdate(req.body[2], savedRecipe, null, true);
  if (savedRecipe && savedUser) res.status(201).send(savedRecipe);
  else res.status(404).end();
 });

// ingredients
app.post("/recipes/:id", async (req, res) => {
  const id = req.params['id'];
  console.log("body of request: ", req.body);
  const newIngredient = await ingredientServices.addIngredient(req.body);
  let recipe = await ingredientServices.findAndUpdate(id, newIngredient);

  if (recipe) res.status(201).send(newIngredient._id);
  else res.status(500).end();
});

app.delete("/recipes/:recipeId/:ingredientId", async (req, res) => {
  const recipeId = req.params['recipeId'];
  const ingredientId = req.params['ingredientId'];

  if (deleteIngredientByRecipeAndIngredientId(recipeId, ingredientId)) res.status(204).end();
  else res.status(404).end();
});

async function deleteIngredientByRecipeAndIngredientId(recipeId, ingredientId) {
  try {
    if (
      (await ingredientServices.deleteIngredient(ingredientId)) &&
      (await ingredientServices.deleteIngredient(recipeId, ingredientId))
    )
      return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

app.get("/recipes/:recipeId/:ingredientId", async (req, res) => {
  const ingredientId = req.params['ingredientId'];
  let result = await ingredientServices.findIngredientById(ingredientId);
  if (result === undefined || result === null)
    res.status(404).send('Resource not found.');
  else {
    res.send(result);
  }
});

// meal outline
app.post("/meal-outlines", async (req, res) => {
  const meal_outline = req.body[0];
  console.log('meal outline:');
  console.log(meal_outline);
  const savedMealOutline = await mealOutlineServices.addMealOutline(meal_outline);
  const savedUser = await userServices.findAndUpdate(req.body[1], null, savedMealOutline, true);
  if (savedMealOutline && savedUser) res.status(201).send(savedMealOutline);
  else res.status(500).end();
});

app.get("/meal-outlines", async (req, res) => {
  const date = req.query["date"];
  const meal_list = req.query["meal_list"];
  try {
    const result = await mealOutlineServices.getMealOutlines(date, meal_list);
    res.send({ mealOutline_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send('An error ocurred in the server.');
  }
});

app.post("/meal-outlines/:date", async (req, res) => {
  const date = req.params['date'];
  console.log('req.body:');
  console.log(req.body);
  var meal_outline = await mealOutlineServices.findMealOutlineByDate(date);
  var target_i;

  if (!meal_outline) res.status(500).end();
  else {
    target_i = 0;
    for (var i=0; i<meal_outline.length; i++) {
      if (meal_outline[i].date === date) {
        target_i = i;
        break;
      }
    }
  }
  var temp_meal_outline = meal_outline[target_i];
  console.log('temp meal outline');
  console.log(temp_meal_outline);
  const newMeal = await mealServices.addMeal(req.body);

  if (!newMeal) res.status(500).end();
  meal_outline = await mealOutlineServices.findAndUpdate(temp_meal_outline._id, newMeal);
  temp_meal_outline = await mealOutlineServices.findMealOutlineById(temp_meal_outline._id);

  if (meal_outline) res.status(201).send([temp_meal_outline, newMeal]);
  else res.status(500).end();
});

app.delete("/meal-outlines/:uid/:date", async (req, res) => {
  const date = req.params["date"];
  const user_id = req.params["uid"];
  const mo_id = await mealOutlineServices.findMealOutlineByDate(date);
  const mo = await mealOutlineServices.findMealOutlineById(mo_id);
  // delete meal outline reference from user's meal list
  console.log('user id in app.delete');
  console.log(user_id);
  if (deleteMealOutlineById(mo_id) && deleteMealOutlineFromUser(user_id, mo)) res.status(204).end();
  else res.status(404).send("Resource not found.");
});

async function deleteMealOutlineById(id) {
  try {
    if (await mealOutlineServices.deleteMealOutline(id)) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteMealOutlineFromUser(user_id, mo) {
  try {
    if (await userServices.findAndUpdate(user_id, null, mo, false)) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

app.get("/meal-outlines/:date", async (req, res) => {
  const date = req.params["date"];
  let result = await mealOutlineServices.findMealOutlineByDate(date);
  if (result === undefined || result === null) {
    res.status(404).send("Resource not found.");
  } else {
    result = { mealOutline_list: result };
    res.send(result);
  }
});

// meal
app.delete("/meal-outlines/:date/:id", async (req, res) => {
  const date = req.params['date'];
  const meal_outline_id = await mealOutlineServices.findMealOutlineByDate(date);
  const meal_id = req.params['id'];
  console.log('meal id');
  console.log(meal_id);

  if (deleteMealById(meal_id)) res.status(204).end();
  else res.status(404).end();
});

async function deleteMealById(meal_id) {
  try {
    if (
      (await mealServices.deleteMeal(meal_id))
    )
      return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
/*
app.get("/meal-outlines/:date/:category", async (req, res) => {
  const date = req.params["date"];
  const category = req.params["category"];

  let result = await mealServices.findMealByCategory(date, category);
  if (result === undefined || result === null) {
    res.status(404).send("Resource not found.");
  } else {
    result = { meal_list: result };
    res.send(result);
  }
});
*/
app.get("/meal-outlines/:date/:id", async (req, res) => {
  const date = req.params['date'];
  const meal_outline_id = await mealOutlineServices.findMealOutlineByDate(date);
  const meal_id = req.params['id'];

  let result = await mealServices.findMealById(meal_id);
  if (result === undefined || result === null) {
    res.status(404).send("Resource not found.");
  } else {
    result = { meal_list: result };
    res.send(result);
  }
});

// grocery list
app.post("/grocery-lists", async (req, res) => {
  const grocery_list = req.body;
  const savedGroceryList = await groceryListServices.addGroceryList(grocery_list);
  if (savedGroceryList) res.status(201).send(savedGroceryList);
  else res.status(500).end();
});

app.get("/grocery-lists", async (req, res) => {
  const name = req.query["name"];
  const items = req.query["items"];
  try {
    const result = await groceryListServices.getGroceryLists(
      name,
      items
    );
    res.send({ groceryList_list: result });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// grocery items
app.get("/grocery-lists/:id", async (req, res) => {
  const id = req.params["id"];
  let result = await groceryListServices.findGroceryListById(id);
  if (result === undefined || result === null) {
    res.status(404).send("Resource not found.");
  } else {
    result = { groceryList_list: result };
    res.send(result);
  }
});

app.post("/grocery-lists/:id", async (req, res) => {
  const id = req.params['id'];
  var grocery_list = await groceryListServices.findGroceryListById(id);

  if (!grocery_list) res.status(500).end();
  else {
    const newGroceryItem = await groceryItemServices.addGroceryItem(req.body);

    if (!newGroceryItem) res.status(500).end();
    grocery_list = await groceryListServices.findAndUpdate(id, newGroceryItem);
    // get updated grocery list object
    grocery_list = await groceryListServices.findGroceryListById(id);

    if (grocery_list) res.status(201).send([grocery_list, newGroceryItem]);
    else res.status(500).end();
  }
});

app.get("/grocery-list/:id/grocery-items", async (req, res) => {
  const id = req.params['id'];

  let result = await groceryListServices.findGroceryListById(id);
  if (result === undefined || result === null) {
    res.status(404).send("Resource not found.");
  } else {
    result = { groceryList_list: result };
    res.send(result);
  }
});

 app.listen(process.env.PORT || port, () => {
   if (process.env.PORT) {
     console.log(`REST API is listening on port: ${process.env.PORT}.`);
   } else console.log(`REST API is listening on port: ${port}.`);
 });