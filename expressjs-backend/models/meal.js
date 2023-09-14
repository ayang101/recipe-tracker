const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const MealSchema = new mongoose.Schema(
    {
        // a meal consists of multiple food items that are eaten together
        // does not necessarily mean a recipe serving, which may make up a fraction of a meal
        // recipe servings can be considered to be part of a meal
        // thus, a meal may consist of a recipe serving or food item list or both
        name: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String,
            required: false,
            trim: true,
            // need to validate image source
        },
        recipe: { type: Schema.Types.ObjectId, ref: 'Recipe' },
        ingredient_list: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
    },
    { collection: 'meal_list' }
);

const Meal = mongoose.model('Meal', MealSchema);

module.exports = Meal;