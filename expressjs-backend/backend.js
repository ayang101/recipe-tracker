const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

const userServices = require('./models/user-services');
const recipeServices = require('./models/recipe-services');
const ingredientServices = require('./models/ingredient-services');

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
  try {
    const name = req.params["name"];
    const email = req.params["email"];
    const username = req.params["username"];
    const recipe_list = req.params["recipe_list"];
    const result = await userServices.getUsers(
      name,
      email,
      username,
      recipe_list
    );
    console.log('result:' + result);
    if (result) {
      res.status(200).send({ users_list: result });
    } else {
      res.status(404).send("User doesn't exist");
    }
  } catch (error) {
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
   const user_id = req.query["user_id"];
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
      user_id
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
  console.log('result: ' + result);

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
    console.log('result: ' + result);

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
    recipe_obj.user_id = req.body[2];
    recipe = recipe_obj;
  }

  const savedRecipe = await recipeServices.addRecipe(recipe);
  if (savedRecipe) res.status(201).send(savedRecipe);
  else res.status(404).end();
 });

// ingredients
app.post('/recipes/:id', async (req, res) => {
  const id = req.params['id'];
  console.log("body of request: ", req.body)
  const newIngredient = await ingredientServices.addIngredient(req.body);
  let recipe = await ingredientServices.findAndUpdate(id, newIngredient);

  if (recipe) res.status(201).send(newIngredient._id);
  else res.status(500).end();
});

app.delete('/recipes/:recipeId/:ingredientId', async (req, res) => {
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

app.get('/recipes/:recipeId/:ingredientId', async (req, res) => {
  const ingredientId = req.params['ingredientId'];
  let result = await ingredientServices.findIngredientById(ingredientId);
  if (result === undefined || result === null)
    res.status(404).send('Resource not found.');
  else {
    res.send(result);
  }
});

 app.listen(process.env.PORT || port, () => {
   if (process.env.PORT) {
     console.log(`REST API is listening on port: ${process.env.PORT}.`);
   } else console.log(`REST API is listening on port: ${port}.`);
 });