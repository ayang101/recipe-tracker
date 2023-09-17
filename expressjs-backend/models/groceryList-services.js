const connectMongoDB = require('./mongoose.db.config');
const groceryListModel = require('./grocerylist');

connectMongoDB();

async function getGroceryLists(name, items) {
  let result;
  if (
    name === undefined &&
    items === undefined
  ) {
    result = await groceryListModel.find();
  } else if (name && !items) {
    result = await findGroceryListByName(name);
  } else {
    result = await findGroceryListByItems(items);
  }
  return result;
}

async function findGroceryListById(id) {
  let result = await groceryListModel.findById(id);
  if (result === null) {
    return undefined;
  } else {
    return result;
  }
}

async function addGroceryList(grocery_list) {
  try {
    const groceryListToAdd = new groceryListModel(grocery_list);
    const savedGroceryList = await groceryListToAdd.save();
    return savedGroceryList;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findAndUpdate(id, item) {
  var new_grocery_list = await groceryListModel.findById(id);
  console.log('new grocery list:');
  console.log(new_grocery_list);
  const query = {
    name: new_grocery_list.name,
    items: new_grocery_list.items,
  };

  var updatedGroceryList = await groceryListModel.updateOne(query, {
    $push: { items: item._id }
  });

  new_grocery_list.save();
  return updatedGroceryList;
}


async function findGroceryListByName(name) {
  return await groceryListModel.find({ name: name });
}

async function findGroceryListByItems(items) {
  return await groceryListModel.find({ items: items });
}

async function deleteGroceryList(id) {
  return await groceryListModel.findByIdAndDelete(id);
}

exports.getGroceryLists = getGroceryLists;
exports.findGroceryListById = findGroceryListById;
exports.findGroceryListByName = findGroceryListByName;
exports.findGroceryListByItems = findGroceryListByItems;
exports.addGroceryList = addGroceryList;
exports.findAndUpdate = findAndUpdate;
exports.deleteGroceryList = deleteGroceryList;