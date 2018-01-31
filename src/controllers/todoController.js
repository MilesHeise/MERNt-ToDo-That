const Todo = require('../models/todos')

exports.test = function(req, res) {
  console.log('fired');
  res.json({
    message: 'API Initialized!'
  });
}

exports.getTodos = function(req, res) {
  Todo.find(function(err, todos) {
    if (err) {
      res.send(err);
    }
    res.json(todos)
  });
}


exports.addTodo = function(req, res) {
  const todo = new Todo();
  todo.description = req.body.description;
  todo.completed = req.body.completed;
  todo.save(function(err) {
    if (err) {
      res.send(err);
    }
    res.json({
      message: 'Todo successfully added!'
    });
  });
}

exports.toggleAll = function(req, res) {
  Todo.update({}, {
    completed: req.body.completed
  }, {
    multi: true
  }, function(err) {
    if (err) {
      res.send(err);
    }
    res.json({
      message: 'Toggle successful'
    });
  });
}

exports.removeCompleted = function(req, res) {
  Todo.remove({
    completed: true
  }, function(err) {
    if (err) {
      res.send(err);
    }
    res.json({
      message: 'Completed todos removed'
    });
  });
}

exports.updateCompletion = function(req, res) {
  Todo.findById(req.params.todo_id, function(err, todo) {
    if (err) {
      res.send(err);
    }
    todo.completed = req.body.completed;
    todo.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({
        message: 'Todo has been updated!'
      });
    });
  });
}


exports.deleteTodo = function(req, res) {
  Todo.remove({
    _id: req.params.todo_id
  }, function(err) {
    if (err) {
      res.send(err);
    }
    res.json({
      message: 'Todo has been deleted'
    });
  });
}
