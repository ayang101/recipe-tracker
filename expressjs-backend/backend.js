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
 
 // recipes
 app.get("/recipes", async (req, res) => {
   const name = req.query["name"];
   const course = req.query["course"];
   const category = req.query["category"];
   const totalTime = req.query["totalTime"];
   const ingredients = req.query["ingredients"];
   try {
    const result = await recipeServices.getRecipes(
      name,
      undefined,
      undefined,
      undefined,
      course,
      category,
      undefined,
      undefined,
      undefined,
      totalTime,
      undefined,
      undefined,
      ingredients
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
 
 app.post("/recipes", async (req, res) => {
  var recipe = req.body;

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

  // additional data of type ld+json
  recipe_obj.rating = recipe_obj.rating;
  recipe_obj.course = recipe_obj.course;
  recipe_obj.category = recipe_obj.category;
  recipe_obj.serving = recipe_obj.serving;

  // TODO: convert prep, cook, and total time to Number
  /*
  if (recipe_obj.rating != undefined){
    recipe_obj.prepTime = decodeURIComponent(recipe_obj.prepTime);
  } if (recipe_obj.rating != undefined){
    recipe_obj.cookTime = decodeURIComponent(recipe_obj.cookTime);
  } if (recipe_obj.rating != undefined){
    recipe_obj.totalTime = decodeURIComponent(recipe_obj.totalTime);
  }
  */
  recipe_obj.ingredients = recipe_obj.ingredients;
  recipe_obj.instructions = recipe_obj.instructions;

  const savedRecipe = await recipeServices.addRecipe(recipe_obj);
  if (savedRecipe) res.status(201).send(savedRecipe);
  else res.status(500).end();
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