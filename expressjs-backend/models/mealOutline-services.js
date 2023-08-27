const connectMongoDB = require('./mongoose.db.config');
const mealOutlineModel = require('./mealOutline');
const mealModel = require('./meal');

connectMongoDB();

async function getMealOutlines(date, meal_list) {
  let result;
  if (
    date === undefined &&
    meal_list === undefined
  ) {
    result = await mealModel.find();
  } else if (date && !meal_list) {
    result = await findMealOutlineByDate(date);
  } else {
    result = await findMealOutlineByMeals(meal_list);
  }
  return result;
}

async function findMealOutlineById(id) {
  let result = await mealOutlineModel.findById(id);
  if (result === null) {
    return undefined;
  } else {
    return result;
  }
}

async function addMealOutline(meal_outline) {
  try {
    const mealOutlineToAdd = new mealOutlineModel(meal_outline);
    const savedMealOutline = await mealOutlineToAdd.save();
    return savedMealOutline;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findAndUpdate(id, meal) {
  var new_meal_outline = await mealOutlineModel.findById(id);
  console.log('new meal outline:');
  console.log(new_meal_outline);
  const query = {
    date: new_meal_outline.date,
    meal_list: new_meal_outline.meal_list,
  };

  var updatedMealOutline = await mealOutlineModel.updateOne(query, {
    $push: { meal_list: meal._id }
  });

  new_meal_outline.save();
  return updatedMealOutline;
}


async function findMealOutlineByDate(date) {
  return await mealOutlineModel.find({ date: date });
}

async function findMealOutlineByMeals(meal_list) {
  return await mealOutlineModel.find({ meal_list: meal_list });
}

async function deleteMealOutline(id) {
  return await mealOutlineModel.findByIdAndDelete(id);
}

exports.getMealOutlines = getMealOutlines;
exports.findMealOutlineById = findMealOutlineById;
exports.findMealOutlineByDate = findMealOutlineByDate;
exports.findMealOutlineByMeals = findMealOutlineByMeals;
exports.addMealOutline = addMealOutline;
exports.findAndUpdate = findAndUpdate;
exports.deleteMealOutline = deleteMealOutline;