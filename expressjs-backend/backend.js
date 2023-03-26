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
 
 app.get("/recipes", async (req, res) => {
   const name = req.query["name"];
   const course = req.query["course"];
   const category = req.query["category"];
   const totalTime = req.query["totalTime"];
   const ingredient_list = req.query["ingredient_list"];
   if (name === undefined && course === undefined && category === undefined
      && totalTime === undefined && ingredient_list === undefined) {
     try {
       const recipes_from_db = await recipeServices.getRecipes();
       res.send({ recipe_list: recipes_from_db });
     } catch (error) {
       console.log("Mongoose error: " + error);
       res.status(500).send("An error ocurred in the server.");
     }
   } else if (name && course === undefined && category === undefined
      && totalTime === undefined && ingredient_list === undefined) {
     let result = await recipeServices.findRecipeByName(name);
     result = { recipe_list: result };
     res.send(result);
   } else if (course && name === undefined && category === undefined
      && totalTime === undefined && ingredient_list === undefined) {
     let result = await recipeServices.findRecipeByCourse(course);
     result = { recipe_list: result };
     res.send(result);
   } else if (category && name === undefined && course === undefined
      && totalTime === undefined && ingredient_list === undefined) {
     let result = await recipeServices.findRecipeByCategory(category);
     result = { recipe_list: result };
     res.send(result);
   } else if (totalTime && name === undefined && course === undefined
      && category === undefined && ingredient_list === undefined) {
     let result = await recipeServices.findRecipeByTotalTime(totalTime);
     result = { recipe_list: result };
     res.send(result);
   } else if (ingredient_list && name === undefined && course === undefined
      && category === undefined && totalTime === undefined) {
     let result = await recipeServices.findRecipeByIngredients(ingredient_list);
     result = { recipe_list: result };
     res.send(result);
   } else {
     let result = await recipeServices.findRecipe(name, course, category,
                                                  totalTime, ingredient_list);
     result = { recipe_list: result };
     res.send(result);
   }
 });
 
 app.get("/recipes/:id", async (req, res) => {
   const id = req.params["id"];
   let result = await recipeServices.findRecipeById(id);
   if (result === undefined || result === null) {
     res.status(404).send("Resource not found.");
   } else {
     result = { recipe_list: result };
     res.send(result);
   }
 });
 
 app.delete("/recipes/:id", async (req, res) => {
   const id = req.params["id"];
   console.log(id);
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
   if (await recipeServices.addRecipe(recipe)) res.status(201).end();
   else res.status(500).end();
 });
 
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
 
 app.listen(process.env.PORT || port, () => {
   if (process.env.PORT) {
     console.log(`REST API is listening on port: ${process.env.PORT}.`);
   } else console.log(`REST API is listening on port: ${port}.`);
 });