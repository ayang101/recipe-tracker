const connectMongoDB = require('./mongoose.db.config');
const ingredientModel = require('./ingredient');

connectMongoDB();

async function getIngredients(name, photo, description, quantity) {
  let result;
  if (
    name === undefined &&
    photo === undefined &&
    description === undefined &&
    quantity === undefined
  ) {
    result = await ingredientModel.find();
  } else if (name && !photo && !description && !quantity) {
    result = await findIngredientByName(name);
  } else if (photo && !name && !description && !quantity) {
    result = await findIngredientByPhoto(photo);
  } else if (description && !name && !photo && !quantity) {
    result = await findIngredientByDescription(description);
  } else {
    result = await findIngredientByQuantity(quantity);
  }
  return result;
}

async function findIngredientById(id) {
  let result = await ingredientModel.findById(id);
  if (result === null) {
    return undefined;
  } else {
    return result;
  }
}

async function addIngredient(ingredient) {
  try {
    const ingredientToAdd = new ingredientModel(ingredient);
    const savedIngredient = await ingredientToAdd.save();
    return savedIngredient;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findIngredientByName(name) {
  return await ingredientModel.find({ name: name });
}

async function findIngredientByPhoto(photo) {
  return await ingredientModel.find({ photo: photo });
}

async function findIngredientByDescription(description) {
  return await ingredientModel.find({ description: description });
}

async function findIngredientByQuantity(quantity) {
  return await ingredientModel.find({ quantity: quantity });
}

async function deleteIngredient(id) {
  return await ingredientModel.findByIdAndDelete(id);
}

exports.getIngredients = getIngredients;
exports.findIngredientById = findIngredientById;
exports.findIngredientByName = findIngredientByName;
exports.findIngredientByPhoto = findIngredientByPhoto;
exports.findIngredientByDescription = findIngredientByDescription;
exports.findIngredientByQuantity = findIngredientByQuantity;
exports.addIngredient = addIngredient;
exports.deleteIngredient = deleteIngredient;