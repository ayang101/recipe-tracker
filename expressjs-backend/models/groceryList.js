const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const GroceryListSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        items: [{ type: Schema.Types.ObjectId, ref: 'GroceryItem' }],
    },
    { collection: 'groceryList_list' }
);

const GroceryList = mongoose.model('GroceryList', GroceryListSchema);

module.exports = GroceryList;