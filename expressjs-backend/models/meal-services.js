const connectMongoDB = require('./mongoose.db.config');
const mealModel = require('./meal');

connectMongoDB();

async function getMeals(name, category, image, recipe_id, ingredient_list) {
  let result;
  if (
    name === undefined &&
    category === undefined &&
    image === undefined &&
    recipe_id === undefined &&
    ingredient_list === undefined
  ) {
    result = await mealModel.find();
  } else if (name && !category && !image && !recipe_id && !ingredient_list) {
    result = await findMealByName(name);
  } else if (category && !name && !image && !recipe_id && !ingredient_list) {
    result = await findMealByCategory(category);
  } else if (image && !name && !category && !recipe_id && !ingredient_list) {
    result = await findMealByImage(image);
  } else if (recipe_id && !name && !category && !image && !ingredient_list) {
    result = await findMealByRecipeId(recipe_id);
  } else {
    result = await findMealByIngredients(ingredient_list);
  }
  return result;
}

async function findMealById(id) {
  let result = await mealModel.findById(id);
  if (result === null) {
    return undefined;
  } else {
    return result;
  }
}

async function addMeal(meal) {
  try {
    const mealToAdd = new mealModel(meal);
    const savedMeal = await mealToAdd.save();
    return savedMeal;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findMealByName(name) {
  return await mealModel.find({ name: name });
}

async function findMealByCategory(category) {
  return await mealModel.find({ category: category });
}

async function findMealByImage(image) {
  return await mealModel.find({ image: image });
}

async function findMealByRecipeId(recipe_id) {
  return await mealModel.find({ recipe_id: recipe_id });
}

async function findMealByIngredients(ingredient_list) {
  return await mealModel.find({ ingredient_list: ingredient_list });
}

async function deleteMeal(id) {
  return await mealModel.findByIdAndDelete(id);
}

exports.getMeals = getMeals;
exports.findMealById = findMealById;
exports.findMealByName = findMealByName;
exports.findMealByCategory = findMealByCategory;
exports.findMealByImage = findMealByImage;
exports.findMealByRecipeId = findMealByRecipeId;
exports.findMealByIngredients = findMealByIngredients;
exports.addMeal = addMeal;
exports.deleteMeal = deleteMeal;