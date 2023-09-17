const connectMongoDB = require('./mongoose.db.config');
const groceryItemModel = require('./groceryItem');

connectMongoDB();

async function getGroceryItems(name, category, priority, quantity, isComplete) {
  let result;
  if (
    name === undefined &&
    category === undefined &&
    priority === undefined &&
    quantity === undefined &&
    isComplete === undefined
  ) {
    result = await groceryItemModel.find();
  } else if (name && !category && !priority && !quantity && !isComplete) {
    result = await findGroceryItemByName(name);
  } else if (category && !name && !priority && !quantity && !isComplete) {
    result = await findGroceryItemByCategory(category);
  } else if (priority && !name && !category && !quantity && !isComplete) {
    result = await findGroceryItemByPriority(priority);
  } else if (quantity && !name && !category && !priority && !isComplete) {
    result = await findGroceryItemByRecipeId(quantity);
  } else {
    /* nothing to see here */
  }
  return result;
}

async function findGroceryItemById(id) {
  let result = await groceryItemModel.findById(id);
  if (result === null) {
    return undefined;
  } else {
    return result;
  }
}

async function addGroceryItem(grocery_item) {
  try {
    const mealToAdd = new groceryItemModel(grocery_item);
    const savedGroceryItem = await mealToAdd.save();
    return savedGroceryItem;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findGroceryItemByName(name) {
  return await groceryItemModel.find({ name: name });
}

async function findGroceryItemByCategory(category) {
  return await groceryItemModel.find({ category: category });
}

async function findGroceryItemByPriority(priority) {
  return await groceryItemModel.find({ priority: priority });
}

async function findGroceryItemByQuantity(quantity) {
  return await groceryItemModel.find({ quantity: quantity });
}

async function deleteGroceryItem(id) {
  return await groceryItemModel.findByIdAndDelete(id);
}

exports.getGroceryItems = getGroceryItems;
exports.findGroceryItemById = findGroceryItemById;
exports.findGroceryItemByName = findGroceryItemByName;
exports.findGroceryItemByCategory = findGroceryItemByCategory;
exports.findGroceryItemByPriority = findGroceryItemByPriority;
exports.findGroceryItemByQuantity = findGroceryItemByQuantity;
exports.addGroceryItem = addGroceryItem;
exports.deleteGroceryItem = deleteGroceryItem;