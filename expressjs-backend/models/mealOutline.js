const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const MealOutlineSchema = new mongoose.Schema(
    {
        date: {
            type: String,
            required: true,
            trim: true
        },
        meal_list: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
    },
    { collection: 'mealOutline_list' }
);

const MealOutline = mongoose.model('MealOutline', MealOutlineSchema);

module.exports = MealOutline;