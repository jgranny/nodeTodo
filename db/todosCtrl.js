const knex = require('../server/index')

module.exports = {

  listTodos(req, res, next) {
    knex.select().table('todos')
    .then(todos => res.send(todos));
  },

  createTodo(req, res, next) {
    const todo = req.body;

    knex('todos')
    .insert(todo)
    .then(() => res.send(todo));
  },

  update(req, res, next) {
    const todoId = req.params.todoId;
    const status = !req.body.complete;

    knex('books')
    .where('todo_id', '=', todoId)
    .update({
      complete: status,
    })
    .then(() => {
      knex.select().table('todos')
      .then(todos => res.send(todos));
    });

  },

  deleteTodo(req, res, next) {
    const todoId = req.params.todoId;

    knex('todos')
    .where('todo_id', todoId)
    .del()
    .then(() => {
      knex.select().table('todos')
      .then(todos => res.send(todos));
    });
  }

};
