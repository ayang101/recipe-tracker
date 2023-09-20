const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const GroceryItemSchema = new mongoose.Schema(
    {
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
        priority: {
            type: String,
            required: false,
            trim: true
        },
        quantity: {
            type: String,
            required: true,
            trim: true
        },
        isComplete: {
            type: Boolean,
            required: true,
            trim: true
        }
    },
    { collection: 'groceryItem_list' }
);

const GroceryItem = mongoose.model('GroceryItem', GroceryItemSchema);

module.exports = GroceryItem;