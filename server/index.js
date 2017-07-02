const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

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

app.use(cors());

//Routes
app.get('/todos', (req, res, next) => {
  knex.select().table('todos')
  .then(todos => res.send(todos));
});

app.post('/todos', (req, res, next) => {
  const todo = req.body;

  knex('todos')
  .insert(todo)
  .then(todoId => {
    knex('todos')
    .where('todo_id', '=', todoId[0])
    .then(todo => res.send(todo))
    // console.log(bleh);
    // res.send(bleh);
  });
});

app.put('/todos/:todoId', (req, res, next) => {
  const todo = req.params.todoId;
  let status;

  req.body.complete ? status = false : status = true;

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
  const todo = req.params.todoId;

  knex('todos')
  .where('todo_id', todoId)
  .del()
  .then(response => {
    res.send(response);
  });
});

app.use(express.static(path.join(__dirname, '../client/')));


//Start Server
app.listen(8080, () => {
  console.log('Server is listening on port 8080...');
});

module.exports = knex;
