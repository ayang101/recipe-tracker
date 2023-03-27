const connectMongoDB = require('./mongoose.db.config');
const mongoose = require('mongoose');
const ingredientServices = require('./ingredient-services.js');
const ingredientModel = require('./ingredient');
connectMongoDB();

test('adding a ingredient', async () => {
  const ingredient = {
    name: 'a'
  };
  const ingredientToAdd = new ingredientModel(ingredient);
  expect(await ingredientServices.addIngredient(ingredientToAdd)).not.toBe(false);
  await ingredientServices.deleteIngredient(ingredientToAdd['_id']);
});

test('adding a ingredient (on failure)', async () => {
  const ingredient = {
    fake: 'a'
  };
  const ingredientToAdd = new ingredientModel(ingredient);

  expect(await ingredientServices.addIngredient(ingredientToAdd)).toBe(false);
});

test('deleting a ingredient', async () => {
  const ingredient = {
    name: 'a',
  };
  const ingredientToAdd = new ingredientModel(ingredient);
  const savedIngredient = await ingredientToAdd.save();
  await ingredientServices.deleteIngredient(savedIngredient['_id']);
  expect(await ingredientModel.findById(savedIngredient['_id'])).not.toBe(savedIngredient);
});

test('finding a ingredient by name', async () => {
  const ingredient = {
    name: 'a'
  };
  let target = new ingredientModel(ingredient);
  await ingredientServices.addIngredient(target);
  let result = await ingredientServices.findIngredientByName('a');
  expect(result[0]['_id']).toStrictEqual(target['_id']);
  await ingredientServices.deleteIngredient(result[0]['_id']);
});

test('finding a ingredient by id', async () => {
  const ingredient = {
    name: 'a'
  };
  let target = new ingredientModel(ingredient);
  let savedIngredient = await ingredientServices.addIngredient(target);
  let result = await ingredientServices.findIngredientById(savedIngredient['_id']);
  expect(result['_id']).toStrictEqual(savedIngredient['_id']);
  await ingredientServices.deleteIngredient(savedIngredient['_id']);
});

test('finding a ingredient by id (on failure)', async () => {
  const ingredient = {
    name: 'a'
  };
  let target = new ingredientModel(ingredient);
  let savedIngredient = await ingredientServices.addIngredient(target);
  await ingredientServices.deleteIngredient(savedIngredient['_id']);
  let result = await ingredientServices.findIngredientById(savedIngredient['_id']);
  expect(result).toBe(undefined);
});
test('getting a list of ingredients', async () => {
  const ingredient = {
    name: 'a'
  };
  let savedIngredient = new ingredientModel(ingredient);
  expect(await ingredientServices.getIngredients(undefined)).toStrictEqual(
    await ingredientModel.find()
  );
  savedIngredient2 = await ingredientServices.addIngredient(savedIngredient);
  let result1 = await ingredientServices.getIngredients('a');
  expect(result1[0]['_id']).toStrictEqual(savedIngredient2['_id']);
  await ingredientServices.deleteIngredient(savedIngredient['_id']);
});

afterAll(() => {
  mongoose.connection.close();
});