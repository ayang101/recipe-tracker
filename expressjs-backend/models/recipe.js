const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    source: {
      type: String,
      required: true,
      trim: true,
      // need to validate url
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
    category: {
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
        type: Number,
        required: true,
        trim: true
    },
    cookTime: {
        type: Number,
        required: true,
        trim: true
    },
    totalTime: {
        type: Number,
        required: false,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    instructions: {
        type: String,
        required: true,
        trim: true
    },
    ingredient_list: [{ type: String, required: true, trim: true }]
  },
  { collection: 'recipe_list' }
);

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;