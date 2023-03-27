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
   const ingredient_list = req.query["ingredient_list"];
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
      ingredient_list
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
  const recipe = req.body;
  const savedRecipe = await recipeServices.addRecipe(recipe);
  if (savedRecipe) res.status(201).send(savedRecipe);
  else res.status(500).end();
 });
 /*
 app.patch("/recipes/:id", async (req, res) => {
   const id = req.params["id"];
   const updatedRecipe = req.body;
   const result = await updateRecipe(id, updatedRecipe);
   if (result === 204) res.status(204).end();
   else if (result === 404) res.status(404).send("Resource not found.");
   else if (result === 500) {
     res.status(500).send("An error ocurred in the server.");
   }
 });

 async function updateRecipe(id, updatedRecipe) {
  try {
    const result = await recipeServices.findByIdAndUpdate(id, updatedRecipe);
    if (result) return 204;
    else return 404;
  } catch (error) {
    console.log(error);
    return 500;
  }
}
*/

// ingredients
app.post('/recipes/:id', async (req, res) => {
  const id = req.params['id'];
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