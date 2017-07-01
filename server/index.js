const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const Todos = require('../db/todosCtrl')

const app = express();

app.use(bodyParser.json());


//Connect Database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: '../dev.sqlite3'
  }
});


//Routes
app.get('/todos', Todos.listTodos);

app.post('/todos', Todos.createTodo);

app.put('.todos/:todoId', Todos.update);

app.delete('/todos/:todoId', Todos.deleteTodo);

app.use(express.static(path.join(__dirname, '../client/')));


//Start Server
app.listen(8080, () => {
  console.log('Server is listening on port 8080...');
});

module.exports = knex;
