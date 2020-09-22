let todos = [];
let globalId = 0;

function getId() {
  globalId++;
  return globalId;
}

function addTodo(todos, newTodoTitle) {
  return todos.concat({ id: getId(), title: newTodoTitle, isComplete: false });
}

function removeTodo(todos, todoId) {
  return todos.filter((todo) => todo.id !== todoId);
}

function changeTodoTitle(todos, todoId, newTodoTitle) {
  return todos.map((todo) =>
    todo.id === todoId ? { ...todo, title: newTodoTitle } : todo
  );
}

function changeTodoStatus(todos, todoId, isComplete) {
  return todos.map((todo) =>
    todo.id === todoId ? { ...todo, isComplete } : todo
  );
}

function removeCompleted(todos) {
  return todos.filter((todo) => todo.isComplete === false);
}
