exports.up = function(knex, Promise) {
  return knex.schema.createTable('todos', function(table) {
    table.string('todo_id').unique();
    table.string('todo');
    table.boolean('complete');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('todos')
};
