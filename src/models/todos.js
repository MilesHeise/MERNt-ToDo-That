const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodosSchema = new Schema({
 description: String,
 completed: Boolean
});

module.exports = mongoose.model('Todo', TodosSchema);
