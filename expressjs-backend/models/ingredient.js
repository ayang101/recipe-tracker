const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    photo: {
      type: String,
      required: false,
      trim: true,
      // need to validate image source
    },
    description: {
      type: String,
      required: false,
      trim: true
    },
    quantity: {
      type: Number,
      required: false,
      trim: true
    }
  },
  { collection: 'ingredient_list' }
);

const Ingredient = mongoose.model('Ingredient', IngredientSchema);

module.exports = Ingredient;