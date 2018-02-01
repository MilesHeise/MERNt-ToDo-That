const Todo = require('../models/todos')

exports.test = function(req, res) {
  res.json({
    message: 'API Initialized!'
  });
}

exports.getTodos = function(req, res, next) {
  Todo.find(function(err, todos) {
    if (err) {
      return next(err);
    }
    res.json(todos)
  });
}


exports.addTodo = function(req, res, next) {
  const todo = new Todo();
  todo.description = req.body.description;
  todo.completed = req.body.completed;
  todo.save(function(err) {
    if (err) {
      return next(err);
    }
    res.json({
      message: 'Todo successfully added!'
    });
  });
}

exports.toggleAll = function(req, res, next) {
  Todo.update({}, {
    completed: req.body.completed
  }, {
    multi: true
  }, function(err) {
    if (err) {
      return next(err);
    }
    res.json({
      message: 'Toggle successful'
    });
  });
}

exports.removeCompleted = function(req, res, next) {
  Todo.remove({
    completed: true
  }, function(err) {
    if (err) {
      return next(err);
    }
    res.json({
      message: 'Completed todos removed'
    });
  });
}

exports.updateTodo = function(req, res, next) {
  Todo.findById(req.params.todo_id, function(err, todo) {
    if (err) {
      return next(err);
    }
    if (req.body.completed !== undefined) {
      todo.completed = req.body.completed;
    }
    if (req.body.description !== undefined) {
      todo.description = req.body.description;
    }
    todo.save(function(err) {
      if (err) {
        return next(err);
      }
      res.json({
        message: 'Todo has been updated!'
      });
    });
  });
}

exports.deleteTodo = function(req, res, next) {
  Todo.remove({
    _id: req.params.todo_id
  }, function(err) {
    if (err) {
      return next(err);
    }
    res.json({
      message: 'Todo has been deleted'
    });
  });
}
