const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    source: {
      type: String,
      required: false,
      trim: true
    },
    author: {
      type: String,
      required: false,
      trim: true
    },
    image: {
      type: String,
      required: false,
      trim: true,
      // need to validate image source
    },
    rating: {
      type: Number,
      required: false,
      trim: true
    },
    course: {
        type: String,
        required: false,
        trim: true
    },
    cuisine: {
        type: String,
        required: false,
        trim: true
    },
    servingSize: {
        type: Number,
        required: false,
        trim: true
    },
    prepTime: {
        type: String,
        required: false,
        trim: true
    },
    cookTime: {
        type: String,
        required: false,
        trim: true
    },
    additionalTime: {
      type: String,
      required: false,
      trim: true
    },
    totalTime: {
        type: String,
        required: false,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    instructions: {
        type: Array,
        required: false,
        trim: true
    },
    ingredients: {
      type: Array,
      required: false,
      trim: true
    },
    user_id: {
      type: String,
      required: false,
      trim: true
    },
    ingredient_list: [{ type: Schema.Types.ObjectId, ref: 'Ingredient' }],
  },
  { collection: 'recipes_list' }
);

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;