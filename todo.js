let todos = [];
let globalId = 0;

function getId() {
  globalId++;
  return globalId;
}

function addTodo(todos, newTodo) {
  return todos.concat({ id: getId(), title: newTodo, isComplete: false });
}

function removeTodo(todos, todoId) {
  return todos.filter((todo) => todo.id !== todoId);
}

function changeTodoTitle(todos, todoId, newTitle) {
  return todos.map((todo) =>
    todo.id === todoId ? Object.assign(todo, { title: newTitle }) : todo
  );
}

function changeTodoStatus(todos, todoId, isComplete) {
  return todos.map((todo) =>
    todo.id === todoId ? Object.assign(todo, { isComplete: isComplete }) : todo
  );
}

function removeCompleted(todos) {
  return todos.filter((todo) => todo.isComplete === false);
}
