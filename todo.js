const render = ({ todos, editTodoId }) => `
<div class="todo__header">
  <div class="todo__title">
    <span>TODO</span>
  </div>
  <form onsubmit="onAddNewTodo(this,event)" class="todo__input">
    <input
      name="title"
      class="todo__input-newTodo"
      type="text"
      placeholder="Введите задание..."
    />
    <input name="isComplete" type="checkbox" />
  </form>
</div>
<ul class="todo__list">
${todos
  .map((todo) =>
    todo.id === editTodoId
      ? `
<li class="todo__list-li">
  <input type="text" value="${todo.title}" />
</li>
`
      : `
<li class="todo__list-li ${todo.isComplete ? `checked` : ``}">
<span class="todo__task">${todo.title}</span
><span class="todo__btn-edit"
  ><svg
    aria-hidden="true"
    class="iconPencilSm"
    width="14"
    height="14"
    viewBox="0 0 14 14"
  >
    <path
      d="M11.1 1.71l1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0zM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88z"
    /></svg></span
><span class="todo__btn-delete">&#215;</span>
</li>
`
  )
  .join("")}
</ul>
<div class="todo__buttons">
  <button class="todo__btn-removeCompleted" onclick="onClearCompleted()">Скрыть выполненные</button>
  <button class="todo__btn-clear">Очистить список</button>
</div>
`;

let state = {
  todos: [
    { id: 1, title: "Title", isComplete: false },
    { id: 2, title: "Title", isComplete: true },
    { id: 3, title: "Title", isComplete: false },
  ],
  editTodoId: 3,
};

const renderToDom = (template) => {
  document.getElementById("todo").innerHTML = template;
};

const setState = (newStatePart) => {
  state = { ...state, ...newStatePart };
  const newHtml = render(state);
  renderToDom(newHtml);
};

const onClearCompleted = () => {
  setState({ todos: removeCompleted(state.todos) });
};

const getFormData = (formElement) => {
  const formData = new FormData(formElement);
  const data = {};
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  return data;
};

const onAddNewTodo = (formElement, event) => {
  event.preventDefault();
  const formData = getFormData(formElement);
  const newTodoTitle = formData.title;
  const newTodoIsComplete = formData.isComplete === "on";
  setState({
    todos: addTodo(state.todos, newTodoTitle, newTodoIsComplete),
  });
};

const main = () => {
  document.getElementById("todo").innerHTML = render(state);
};

main();

let globalId = 0;

const getId = () => {
  globalId++;
  return globalId;
};

const addTodo = (todos, newTodoTitle, isComplete = false) => {
  return todos.concat({ id: getId(), title: newTodoTitle, isComplete });
};

const removeTodo = (todos, todoId) => {
  return todos.filter((todo) => todo.id !== todoId);
};

const changeTodoTitle = (todos, todoId, newTodoTitle) => {
  return todos.map((todo) =>
    todo.id === todoId ? { ...todo, title: newTodoTitle } : todo
  );
};

const changeTodoStatus = (todos, todoId, isComplete) => {
  return todos.map((todo) =>
    todo.id === todoId ? { ...todo, isComplete } : todo
  );
};

const removeCompleted = (todos) => {
  return todos.filter((todo) => todo.isComplete === false);
};
