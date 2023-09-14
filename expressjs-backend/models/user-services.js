const connectMongoDB = require('./mongoose.db.config');
const userModel = require('./user');

connectMongoDB();

async function getUsers(name, email, username, meal_plan, recipe_list) {
  let result;
  if (
    name === undefined &&
    email === undefined &&
    username === undefined &&
    meal_plan === undefined &&
    recipe_list === undefined
  ) {
    result = await userModel.find();
  } else if (name && !email && !username && !password && !meal_plan && !recipe_list) {
    result = await findUserByName(name);
  } else if (email && !name && !username && !password && !meal_plan && !recipe_list) {
    result = await findUserByEmail(email);
  } else if (username && !name && !email && !password && !meal_plan && !recipe_list) {
    result = await findUserByUserName(username);
  } else if (meal_plan && !username && !name && !email && !password && !recipe_list) {
    result = await findUserByMealPlan(meal_plan);
  } else {
    result = await findUserByRecipeList(recipe_list);
  }
  return result;
}

async function findUserById(id) {
  try {
    const u = await userModel.findById(id);
    
    return u;
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

async function findAndUpdate(id, recipe, meal_plan) {
  console.log('user id in findAndUpdate');
  console.log(id);
  let user = await userModel.findById(id);
  console.log('user');
  console.log(user);
  const query = {
    name: user.name,
    email: user.email,
    username: user.username,
    recipe_list: user.recipe_list,
    meal_plan: user.meal_plan
  };

  var updatedUser = null;
  if(recipe) {
    updatedUser = await userModel.updateOne(query, {
      $push: { recipe_list: recipe._id }
    });
  } else {
    updatedUser = await userModel.updateOne(query, {
      $push: { meal_plan: meal_plan._id }
    });
  }
  

  user.save();
  console.log('updatedUser');
  console.log(updatedUser);
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

async function findUserByMealPlan(meal_plan) {
  return await userModel.find({ meal_plan: meal_plan });
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
exports.findUserByMealPlan = findUserByMealPlan;
exports.findUserByRecipeList = findUserByRecipeList;
exports.addUser = addUser;
exports.findAndUpdate = findAndUpdate;
exports.deleteUser = deleteUser;
exports.deleteRecipe = deleteRecipe;
exports.getAllUsernames = getAllUsernames;
exports.verifyUser = verifyUser;