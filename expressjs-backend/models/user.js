const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
      // unique: true,
      // index: true
      /*validate(value) {
      if (value.length < 2) throw new Error("Invalid job.");
    },*/
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
      // index: true
    },
    password: {
      type: String
      /*required: true,
      trim: true,
      unique: true,
      index: true*/
    },
    meal_plan: [{ type: Schema.Types.ObjectId, ref: 'MealOutline'}],
    recipe_list: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
    grocery_lists: [{ type: Schema.Types.ObjectId, ref: 'GroceryList' }]
  },
  { collection: 'users' }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;