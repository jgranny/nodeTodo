const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());


//Connect Database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: '/Users/jgranstaff/Documents/nodeTodo/dev.sqlite3'
  },
  useNullAsDefault: true
});


//Routes
app.get('/todos', (req, res, next) => {
  knex.select().table('todos')
  .then(todos => res.send(todos));
});

app.post('/todos', (req, res, next) => {
  const todo = req.body;

  knex('todos')
  .insert(todo)
  .then(() => res.send(todo));
});

app.put('/todos', (req, res, next) => {
  const todoId = req.body.todo_id;
  let status;

  req.body.complete ? status = 0 : status = 1;

  knex('todos')
  .where('todo_id', '=', todoId)
  .update({
    complete: status,
  })
  .then(() => {
    knex.select().table('todos')
    .then(todos => res.send(todos));
  });

});

app.delete('/todos/:todoId', (req, res, next) => {
  const todoId = req.params.todoId;

  knex('todos')
  .where('todo_id', todoId)
  .del()
  .then(() => {
    knex.select().table('todos')
    .then(todos => res.send(todos));
  });
});

app.use(express.static(path.join(__dirname, '../client/')));


//Start Server
app.listen(8080, () => {
  console.log('Server is listening on port 8080...');
});

module.exports = knex;
