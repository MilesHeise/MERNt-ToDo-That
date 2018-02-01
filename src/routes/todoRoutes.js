const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/todoController');

router.get('/', TodoController.test);

router.route('/todos')
  .get(TodoController.getTodos)
  .post(TodoController.addTodo);

router.route('/toggle-all')
  .put(TodoController.toggleAll);

router.route('/remove-completed')
  .delete(TodoController.removeCompleted);

router.route('/todos/:todo_id')
  .put(TodoController.updateTodo)
  .delete(TodoController.deleteTodo);

module.exports = router;
