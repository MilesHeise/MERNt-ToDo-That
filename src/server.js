const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Todo = require('./models/todos')

const app = express();
const router = express.Router();

const port = process.env.API_PORT || 3001;

mongoose.connect('mongodb://testy:helloworld@ds211558.mlab.com:11558/merntodo');
// if I wanted to could I make an ignored file to hold name and password,
// and import it at top, then use it as variable inside mongo connect?

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/', function(req, res) {
  res.json({message: 'API Initialized!'});
});

router.route('/todos')
  .get(function(req, res) {
    Todo.find(function(err, todos) {
      if (err)
        res.send(err);
      res.json(todos)
    });
  }).post(function(req, res) {
    const todo = new Todo();
    todo.description = req.body.description;
    todo.completed = req.body.completed;
    todo.save(function(err) {
      if (err)
        res.send(err);
      res.json({message: 'Todo successfully added!'});
    });
});

router.route('/todos/:todo_id')
  .delete(function(req, res) {
    Todo.remove({ _id: req.params.todo_id }, function(err, todo) {
      if (err)
        res.send(err);
      res.json({message: 'Todo has been deleted'})
    })
});

app.use('/api', router);

app.listen(port, function() {
  console.log('api running on port ${port}');
});
