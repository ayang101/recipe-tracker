const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

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
   const ingredients = req.query["ingredients"];
   if (name === undefined && course === undefined && category === undefined
      && totalTime === undefined && ingredients === undefined) {
     try {
       const recipes_from_db = await recipeServices.getRecipes();
       res.send({ recipes_list: recipes_from_db });
     } catch (error) {
       console.log("Mongoose error: " + error);
       res.status(500).send("An error ocurred in the server.");
     }
   } else if (name && course === undefined && category === undefined
      && totalTime === undefined && ingredients === undefined) {
     let result = await recipeServices.findRecipeByName(name);
     result = { recipes_list: result };
     res.send(result);
   } else if (course && name === undefined && category === undefined
      && totalTime === undefined && ingredients === undefined) {
     let result = await recipeServices.findRecipeByCourse(course);
     result = { recipes_list: result };
     res.send(result);
   } else if (category && name === undefined && course === undefined
      && totalTime === undefined && ingredients === undefined) {
     let result = await recipeServices.findRecipeByCategory(category);
     result = { recipes_list: result };
     res.send(result);
   } else if (totalTime && name === undefined && course === undefined
      && category === undefined && ingredients === undefined) {
     let result = await recipeServices.findRecipeByTotalTime(totalTime);
     result = { recipes_list: result };
     res.send(result);
   } else if (ingredients && name === undefined && course === undefined
      && category === undefined && totalTime === undefined) {
     let result = await recipeServices.findRecipeByIngredients(ingredients);
     result = { recipes_list: result };
     res.send(result);
   } else {
     let result = await recipeServices.findRecipe(name, course, category,
                                                  totalTime, ingredients);
     result = { recipes_list: result };
     res.send(result);
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
 
 app.listen(process.env.PORT || port, () => {
   if (process.env.PORT) {
     console.log(`REST API is listening on port: ${process.env.PORT}.`);
   } else console.log(`REST API is listening on port: ${port}.`);
 });