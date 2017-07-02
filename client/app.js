const URL = '127.0.0.1';

//On page load add items from database
$.ajax({
  method: 'GET',
  url: `http://${URL}:8080/todos`,
  contentType: 'application/json',
  success: function(data) {
    data.map(function(todo) {
      if (todo.complete) {
        $('.complete .completed-items').append(addCompleteTodo(todo.todo));
      } else {
        $('.todo .todo-items').append(addTodo(todo.todo));
      }
    })
  },
  error: function(err) { console.log('Error: ', err) }
})

//Add todo list item
$(".todo-input").keypress(function(e) {
  const todo = $('.todo-input').val();
  const data = JSON.stringify({
    todo,
    complete: 0
  });

  if (e.which === 13) {
    $('.todo .todo-items').append(addTodo(todo));
    $('.todo-input').val('');

    //send ajax to post todo
    $.ajax({
      method: 'POST',
      url: `http://${URL}:8080/todos`,
      contentType: 'application/json',
      data: data,
      success: function(res) { console.log(res) },
      error: function(err) { console.log('Error: ', err) }
    });
  }
})

//Create list item
function addTodo(todo) {
  return '<li class="todo-item">' + todo + '<button value="todo" class="toggle-item"></button><button class="delete-item"></button></li>'
};

function addCompleteTodo(todo) {
  return '<li class="todo-item">' + todo + '<button value="complete" class="toggle-item"></button><button class="delete-item"></button></li>'
}

//Remove list item
$(document).on("click", '.delete-item', function() {
  const todo = $(this).text();
  const data = JSON.stringify({
    todo
  });

  $(this).parent().remove();

  //Send delete to remove item from database
  $.ajax({
    method: 'DELETE',
    url: `http://${URL}:8080/todos`,
    contentType: 'application/json',
    data: data,
    success: function(res) { console.log(res) },
    error: function(err) { console.log('Error: ', err) }
  });

});

//Toggle item location (todo / complete)
$(document).on("click", '.toggle-item', function() {
  const todo = $(this).text();
  let complete;
  let data = {
    todo,
    complete: null
  };

  if ($(this).val() === 'todo') {
    $('.completed .completed-items').append($(this).parent());
    $(this).val('complete');

    data.complete = 0;
  } else {
    $('.todo .todo-items').append($(this).parent());
    $(this).val('todo');

    data.complete = 1;
  }

  //Send post to update todo's status in database
  $.ajax({
    method: 'PUT',
    url: `http://${URL}:8080/todos`,
    contentType: 'application/json',
    data: JSON.stringify(data),
    success: function(res) { console.log(res) },
    error: function(err) { console.log('Error: ', err) }
  });

});
