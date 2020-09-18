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
  const index = todos.findIndex((todo) => todo.id === todoId);
  if (index === -1) {
    throw new Error("Id not found");
  }
  return todos.filter((todo) => todo.id !== todoId);
}

function changeTodoTitle(todos, todoId, newTitle) {
  const index = todos.findIndex((todo) => todo.id === todoId);
  if (index === -1) {
    throw new Error("Id not found");
  } else {
    return todos.map((todo) =>
      todo.id === todoId ? Object.assign(todo, { title: newTitle }) : todo
    );
  }
}

function changeTodoStatus(todos, todoId, isComplete) {
  const index = todos.findIndex((todo) => todo.id === todoId);
  if (index === -1) {
    throw new Error("Id not found");
  } else {
    return todos.map((todo) =>
      todo.id === todoId
        ? Object.assign(todo, { isComplete: isComplete })
        : todo
    );
  }
}

function removeCompleted(todos) {
  return todos.filter((todo) => todo.isComplete === false);
}
