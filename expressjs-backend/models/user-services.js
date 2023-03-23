const connectMongoDB = require('./mongoose.db.config');
const userModel = require('./user');

connectMongoDB();

async function getUsers(name, username, email, recipe_list) {
  let result;
  if (
    name === undefined &&
    username === undefined &&
    recipe_list === undefined &&
    email === undefined
  ) {
    result = await userModel.find();
  } else if (username && !name && !email && !recipe_list) {
    result = await findUserByUserName(username);
  } else if (email && !username && !name && !recipe_list) {
    result = await findUserByEmail(email);
  } else if (recipe_list && !username && !name && !email) {
    result = await findUserByRecipeList(recipe_list);
  } else {
    result = await findUserByName(name);
  }
  return result;
}

async function findUserById(id) {
  try {
    const u = await userModel.findById(id);
    const query = { _id: u._id };

    const recipesList = await userModel.find(query).populate('recipe_list');

    return recipesList[0].recipe_list;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  try {
    const userToAdd = new userModel(user);
    const savedUser = await userToAdd.save();
    return savedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findAndUpdate(id, recipe) {
  let new_user = await userModel.findById(id);
  const query = {
    name: new_user.name,
    email: new_user.email,
    username: new_user.username
  };

  var updatedUser = await userModel.updateOne(query, {
    $push: { recipe_list: recipe._id }
  });

  new_user.save();
  return updatedUser;
}

async function getAllUsernames() {
  var usernameList = (await userModel.find()).map(function (p) {
    return p.username;
  });

  return usernameList;
}

async function verifyUser(username, password) {
  const user_query = { username: username, password: password };
  // const pass_query = { password: password };
  try {
    let userId = await userModel.find(user_query);
    console.log(userId);
    userId = userId[0]['_id'];
    let user = await userModel.findById(userId);
    console.log(user);
    return user;
  } catch {
    return false;
  }
}

async function findUserByName(name) {
  return await userModel.find({ name: name });
}

async function findUserByUserName(username) {
  return await userModel.find({ username: username });
}

async function findUserByEmail(email) {
  return await userModel.find({ email: email });
}

async function findUserByRecipeList(recipe_list) {
  return await userModel.find({ recipe_list: recipe_list });
}

async function deleteUser(id) {
  return await userModel.findByIdAndDelete(id);
}

async function deleteRecipe(userId, recipeId) {
  let user = await userModel.findById(userId);
  const query = { name: user['name'] };

  return await userModel.updateOne(query, {
    $pull: { recipe_list: recipeId }
  });
}

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.findUserByName = findUserByName;
exports.findUserByEmail = findUserByEmail;
exports.findUserByUserName = findUserByUserName;
exports.findUserByRecipeList = findUserByRecipeList;
exports.addUser = addUser;
exports.findAndUpdate = findAndUpdate;
exports.deleteUser = deleteUser;
exports.deleteRecipe = deleteRecipe;
exports.getAllUsernames = getAllUsernames;
exports.verifyUser = verifyUser;