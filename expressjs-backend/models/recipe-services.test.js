const connectMongoDB = require('./mongoose.db.config');
const mongoose = require('mongoose');
const recipeServices = require('./recipe-services.js');
const recipeModel = require('./recipe');
const ingredientModel = require('./ingredient');

connectMongoDB();

test('adding a recipe', async () => {
  const recipe = {
    name: 'a',
    source: 'a'
  };
  const recipeToAdd = new recipeModel(recipe);

  expect(await recipeServices.addRecipe(recipeToAdd)).not.toBe(false);
  await recipeServices.deleteRecipe(recipeToAdd['_id']);
});
test('adding a recipe (on failure)', async () => {
  const recipe = {
    fake: 'a'
  };
  const recipeToAdd = new recipeModel(recipe);

  expect(await recipeServices.addRecipe(recipeToAdd)).toBe(false);
});
test('deleting a recipe', async () => {
  const recipe = {
    name: 'a',
    source: 'a'
  };
  const recipeToAdd = new recipeModel(recipe);
  const savedRecipe = await recipeToAdd.save();
  await recipeServices.deleteRecipe(savedRecipe['_id']);
  expect(await recipeModel.findById(savedRecipe['_id'])).not.toBe(savedRecipe);
});
test('finding a recipe by name', async () => {
  const recipe = {
    name: 'a',
    source: 'a'
  };
  let target = new recipeModel(recipe);
  await recipeServices.addRecipe(target);
  let result = await recipeServices.findRecipeByName('a');
  expect(result[0]['_id']).toStrictEqual(target['_id']);
  await recipeServices.deleteRecipe(result[0]['_id']);
});
test('finding a recipe by id', async () => {
  const recipe = {
    name: 'a',
    source: 'a'
  };
  let target = new recipeModel(recipe);
  savedRecipe = await recipeServices.addRecipe(target);
  let result = await recipeServices.findRecipeById(savedRecipe['_id']);
  expect(result).toStrictEqual(savedRecipe['ingredient_list']);
  await recipeServices.deleteRecipe(savedRecipe['_id']);
});
test('finding a recipe by id (on failure)', async () => {
  const recipe = {
    name: 'a',
    source: 'a'
  };
  let target = new recipeModel(recipe);
  savedRecipe = await recipeServices.addRecipe(target);
  await recipeServices.deleteRecipe(savedRecipe['_id']);
  let result = await recipeServices.findRecipeById(savedRecipe['_id']);
  expect(result).toBe(undefined);
});
test('finding a recipe by id and updating the ingredient list', async () => {
  const recipe = {
    name: 'a',
    source: 'a'
  };
  const ingredient = {
    name: 'test'
  };
  let mod = new recipeModel(recipe);
  let savedIngredient = new ingredientModel(ingredient);
  savedRecipe = await recipeServices.addRecipe(mod);
  await recipeServices.findAndUpdate(savedRecipe['_id'], savedIngredient);
  expect(
    (await recipeServices.findRecipeByName('a'))[0]['ingredient_list'][0]
  ).toStrictEqual(savedIngredient['_id']);
  await recipeServices.deleteRecipe(savedRecipe['_id']);
});

test('finding a recipe by id and deleting a ingredient', async () => {
  const recipe = {
    name: 'a',
    source: 'a'
  };
  const ingredient = {
    name: 'test'
  };
  let mod = new recipeModel(recipe);
  let savedIngredient = new ingredientModel(ingredient);
  savedRecipe = await recipeServices.addRecipe(mod);
  await recipeServices.findAndUpdate(savedRecipe['_id'], savedIngredient);
  ingredientList = await recipeServices.deleteIngredient(
    savedRecipe['_id'],
    savedIngredient['_id']
  );
  expect(
    (await recipeServices.findRecipeByName('a'))[0]['ingredient_list']
  ).toStrictEqual([]);
  await recipeServices.deleteRecipe(savedRecipe['_id']);
});
test('finding a recipe by ingredient list', async () => {
  const recipe = {
    name: 'a',
    source: 'a'
  };
  const ingredient = {
    name: 'test'
  };
  let mod = new recipeModel(recipe);
  let savedIngredient = new ingredientModel(ingredient);
  savedRecipe = await recipeServices.addRecipe(mod);
  await recipeServices.findAndUpdate(savedRecipe['_id'], savedIngredient);
  let result = await recipeServices.findRecipeByIngredients([savedIngredient]);
  expect(result[0]['_id']).toStrictEqual(savedRecipe['_id']);
  await recipeServices.deleteRecipe(savedRecipe['_id']);
});

test('getting a list of recipes', async () => {
  const recipe = {
    name: 'a',
    source: 'a'
  };
  const ingredient = {
    name: 'test'
  };
  let mod = new recipeModel(recipe);
  let savedIngredient = new ingredientModel(ingredient);
  expect(
    await recipeServices.getRecipes(undefined, undefined, undefined,
                                    undefined, undefined, undefined,
                                    undefined, undefined, undefined,
                                    undefined, undefined, undefined,
                                    undefined)
  ).toStrictEqual(await recipeModel.find());
  savedRecipe = await recipeServices.addRecipe(mod);
  await recipeServices.findAndUpdate(savedRecipe['_id'], savedIngredient);
  let result1 = await recipeServices.getRecipes(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    [savedIngredient]
  );
  expect(result1[0]['_id']).toStrictEqual(savedRecipe['_id']);
  let result2 = await recipeServices.getRecipes('a', undefined, undefined,
                                                undefined, undefined, undefined,
                                                undefined, undefined, undefined,
                                                undefined, undefined, undefined,
                                                undefined);
  expect(result2[0]['name']).toStrictEqual(savedRecipe['name']);

  await recipeServices.deleteRecipe(savedRecipe['_id']);
});
afterAll(() => {
  mongoose.connection.close();
});