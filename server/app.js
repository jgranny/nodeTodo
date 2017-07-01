const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());


const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: '../db/tododb.sqlite3'
  }
});

routes(app);

app.use(express.static(path.join(__dirname, '../client/')));

module.exports = app;
