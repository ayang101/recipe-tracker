const connectMongoDB = require('./mongoose.db.config');
const recipeModel = require('./recipe');

connectMongoDB();

async function getRecipes(name, source, image, rating, course, category,
                        servingSize, prepTime, cookTime, totalTime,
                        description, instructions, ingredient_list) {
  let result;
  if (
    name === undefined &&
    source === undefined &&
    image === undefined &&
    rating === undefined &&
    course === undefined &&
    category === undefined &&
    servingSize === undefined &&
    prepTime === undefined &&
    cookTime === undefined &&
    totalTime === undefined &&
    description === undefined &&
    instructions === undefined &&
    ingredient_list === undefined
  ) {
    result = await recipeModel.find();
  } else if (name && !source && !image && !rating && !course && !category &&
             !servingSize && !prepTime && !cookTime && !totalTime &&
             !description && !instructions && !ingredient_list) {
    result = await findRecipeByName(name);
  } else if (source && !name && !image && !rating && !course && !category &&
             !servingSize && !prepTime && !cookTime && !totalTime &&
             !description && !instructions && !ingredient_list) {
    result = await findRecipeBySource(source);
  } else if (image && !name && !source && !rating && !course && !category &&
             !servingSize && !prepTime && !cookTime && !totalTime &&
             !description && !instructions && !ingredient_list) {
    result = await findRecipeByImage(image);
  } else if (rating && !name && !source && !image && !course && !category &&
             !servingSize && !prepTime && !cookTime && !totalTime &&
             !description && !instructions && !ingredient_list) {
    result = await findRecipeByRating(rating);
  } else if (course && !name && !source && !image && !rating && !category &&
           !servingSize && !prepTime && !cookTime && !totalTime &&
           !description && !instructions && !ingredient_list) {
    result = await findRecipeByCourse(course);
  } else if (category && !name && !source && !image && !rating && !course &&
           !servingSize && !prepTime && !cookTime && !totalTime &&
           !description && !instructions && !ingredient_list) {
    result = await findRecipeByCategory(category);
  } else if (servingSize && !name && !source && !image && !rating && !course &&
           !category && !prepTime && !cookTime && !totalTime &&
           !description && !instructions && !ingredient_list) {
    result = await findRecipeByServingSize(servingSize);
  } else if (prepTime && !name && !source && !image && !rating && !course &&
           !category && !servingSize && !cookTime && !totalTime &&
           !description && !instructions && !ingredient_list) {
    result = await findRecipeByPrepTime(prepTime);
  } else if (cookTime && !name && !source && !image && !rating && !course &&
           !category && !servingSize && !prepTime && !totalTime &&
           !description && !instructions && !ingredient_list) {
    result = await findRecipeByCookTime(cookTime);
  } else if (totalTime && !name && !source && !image && !rating && !course &&
           !category && !servingSize && !prepTime && !cookTime &&
           !description && !instructions && !ingredient_list) {
    result = await findRecipeByTotalTime(totalTime);
  } else if (description && !name && !source && !image && !rating && !course &&
           !category && !servingSize && !prepTime && !cookTime && !totalTime &&
           !instructions && !ingredient_list) {
    result = await findRecipeByDescription(description);
  } else if (instructions && !name && !source && !image && !rating && !course &&
           !category && !servingSize && !prepTime && !cookTime && !totalTime &&
           !description && !ingredient_list) {
    result = await findRecipeByInstructions(instructions);
  } else {
    result = await findRecipeByIngredients(ingredient_list);
  }
  return result;
}

async function findRecipeById(id) {
  try {
    const recipe = await recipeModel.findById(id);
    const query = { _id: recipe._id };

    const ingredientList = await recipeModel.find(query).populate('ingredient_list');

    return recipe;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addRecipe(recipe) {
  try {
    const recipeToAdd = new recipeModel(recipe);
    const savedRecipe = await recipeToAdd.save();
    return savedRecipe;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findAndUpdate(id, image, rating, course, category,
  servingSize, prepTime, cookTime, totalTime, description, instructions,
  ingredients) {
    let recipe = await recipeModel.findById(id);
    const query = { _id: recipe._id };

    var updatedRecipe = await recipeModel.updateOne(query, {
      $push: { image: image._id }
    });
    var updatedRecipe = await recipeModel.updateOne(query, {
      $push: { rating: rating._id }
    });
    var updatedRecipe = await recipeModel.updateOne(query, {
      $push: { course: course._id }
    });
    var updatedRecipe = await recipeModel.updateOne(query, {
      $push: { category: category._id }
    });
    var updatedRecipe = await recipeModel.updateOne(query, {
      $push: { servingSize: servingSize._id }
    });
    var updatedRecipe = await recipeModel.updateOne(query, {
      $push: { prepTime: prepTime._id }
    });
    var updatedRecipe = await recipeModel.updateOne(query, {
      $push: { cookTime: cookTime._id }
    });
    var updatedRecipe = await recipeModel.updateOne(query, {
      $push: { totalTime: totalTime._id }
    });
    var updatedRecipe = await recipeModel.updateOne(query, {
      $push: { description: description._id }
    });
    var updatedRecipe = await recipeModel.updateOne(query, {
      $push: { instructions: instructions._id }
    });
    var updatedRecipe = await recipeModel.updateOne(query, {
        $push: { ingredient_list: ingredients._id }
    });

    recipe.save();
    return updatedRecipe;
}

async function findRecipeByName(name) {
  return await recipeModel.find({ name: name });
}

async function findRecipeBySource(source) {
    return await recipeModel.find({ source: source });
}

async function findRecipeByImage(image) {
    return await recipeModel.find({ image: image });
}

async function findRecipeByRating(rating) {
    return await recipeModel.find({ rating: rating });
}

async function findRecipeByCourse(course) {
    return await recipeModel.find({ course: course });
}

async function findRecipeByCategory(category) {
    return await recipeModel.find({ category: category });
}

async function findRecipeByServingSize(servingSize) {
    return await recipeModel.find({ servingSize: servingSize });
}

async function findRecipeByPrepTime(prepTime) {
    return await recipeModel.find({ prepTime: prepTime });
}

async function findRecipeByCookTime(cookTime) {
    return await recipeModel.find({ cookTime: cookTime });
}

async function findRecipeByTotalTime(totalTime) {
    return await recipeModel.find({ totalTime: totalTime });
}

async function findRecipeByDescription(description) {
    return await recipeModel.find({ description: description });
}

async function findRecipeByInstructions(instructions) {
    return await recipeModel.find({ instructions: instructions });
}

async function findRecipeByIngredients(ingredient_list) {
    return await recipeModel.find({ ingredient_list: ingredient_list });
}

async function deleteRecipe(id) {
  return await recipeModel.findByIdAndDelete(id);
}

async function deleteIngredient(recipeId, ingrId) {
  let recipe = await recipeModel.findById(recipeId);
  const query = { _id: recipe._id };

  return await recipeModel.updateOne(query, {
    $pull: { ingredient_list: ingrId }
  });
}

exports.findRecipeById = findRecipeById;
exports.addRecipe = addRecipe;
exports.findAndUpdate = findAndUpdate;
exports.findRecipeByName = findRecipeByName;
exports.findRecipeBySource = findRecipeBySource;
exports.findRecipeByImage = findRecipeByImage;
exports.findRecipeByRating = findRecipeByRating;
exports.findRecipeByCourse = findRecipeByCourse;
exports.findRecipeByCategory = findRecipeByCategory;
exports.servingSize = findRecipeByServingSize;
exports.findRecipeByPrepTime = findRecipeByPrepTime;
exports.findRecipeByCookTime = findRecipeByCookTime;
exports.findRecipeByTotalTime = findRecipeByTotalTime;
exports.findRecipeByDescription = findRecipeByDescription;
exports.findRecipeByInstructions = findRecipeByInstructions;
exports.findRecipeByIngredients = findRecipeByIngredients;
exports.getRecipes = getRecipes;
exports.findRecipeById = findRecipeById;
exports.findRecipeByName = findRecipeByName;
exports.deleteRecipe = deleteRecipe;
exports.deleteIngredient = deleteIngredient;
