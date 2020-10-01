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
  </form>
</div>
<ul class="todo__list">
${todos
  .map((todo) =>
    todo.id === editTodoId
      ? `
<li class="todo__list-li">
<form onsubmit="onSaveTitle(this, event, ${todo.id})">
  <input name="title" type="text" value="${todo.title}" />
</form>  
</li>
`
      : `
<li class="todo__list-li ${todo.isComplete ? `checked` : ``}">
<span onclick="onChangeTodoStatus(${todo.id})" class="todo__task">${
          todo.title
        }</span>
<span onclick="onEditTodo(${todo.id})" class="todo__btn-edit">
  <svg
    aria-hidden="true"
    class="iconPencilSm"
    width="14"
    height="14"
    viewBox="0 0 14 14"
  >
    <path
      d="M11.1 1.71l1.13 1.12c.2.2.2.51 0 .71L11.1 4.7 9.21 2.86l1.17-1.15c.2-.2.51-.2.71 0zM2 10.12l6.37-6.43 1.88 1.88L3.88 12H2v-1.88z"
    />
  </svg>
</span>
<span onclick="onDeleteTodo(${todo.id})" class="todo__btn-delete">
  &#215;
</span>
</li>
`
  )
  .join("")}
${
  todos.length > 0
    ? `
</ul>
<div class="todo__buttons">
  <button class="todo__btn-removeCompleted" onclick="onClearCompleted()" class="filter${
    state.filter === "unchecked" ? ` active` : ``
  }">Скрыть выполненные</button>
  <button class="todo__btn-hideUncompleted" onclick="onHideUncompleted()" class="filter${
    state.filter === "checked" ? ` active` : ``
  }">Скрыть невыполненные</button>
  <button class="todo__btn-showAll" onclick="onShowAll()" class="filter${
    state.filter === null ? ` active` : ``
  }">Показать все</button>
  <button class="todo__btn-clear" onclick="onClearAll()">Очистить список</button>
</div>`
    : ``
}

`;

let state = {
  todos: [],
  editTodoId: null,
  filter: null,
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
  state = { ...state, filter: "unchecked" };
  setState({
    todos: getUncheckedTodo(state.todos),
  });
};

const onHideUncompleted = () => {
  state = { ...state, filter: "checked" };
  setState({
    todos: getCheckedTodo(state.todos),
  });
};

const onShowAll = () => {
  state = { ...state, filter: null };
  setState(newState);
};

const onClearAll = () => {
  setState({
    todos: [],
  });
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

const onSaveTitle = (formElement, event, todoId) => {
  event.preventDefault();
  const formData = getFormData(formElement);
  setState({
    todos: changeTodoTitle(state.todos, todoId, formData.title),
    editTodoId: null,
  });
};

const onEditTodo = (editTodoId) => {
  setState({
    editTodoId,
  });
};

const onDeleteTodo = (deleteTodoId) => {
  setState({
    todos: removeTodo(state.todos, deleteTodoId),
  });
};

const onChangeTodoStatus = (todoId) => {
  setState({
    todos: changeTodoStatus(state.todos, todoId),
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

const changeTodoStatus = (todos, todoId) => {
  return todos.map((todo) =>
    todo.id === todoId ? { ...todo, isComplete: !todo.isComplete } : todo
  );
};

const getUncheckedTodo = (todos) => {
  return todos.filter((todo) => todo.isComplete === false);
};

const getCheckedTodo = (todos) => {
  return todos.filter((todo) => todo.isComplete === true);
};