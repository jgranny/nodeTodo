module.exports = (app) => {

  app.get('/todos', Todos.listTodos);

  app.post('/todos', Todos.createTodo);

  app.delete('/todos/:todoId', Todos.deleteTodo)

};
