const todosNode = document.querySelector('.todo__list');
const inputNode = document.querySelector('.add-tasks');
const btnNode = document.querySelector('.input-btn');
const btnCompleted = document.querySelector('.todo-btn__completed')
const todoCompleted = document.querySelector('.todo__list__completed')
let todos;

if (!localStorage.todos) {
  todos = [];
} else {
  todos = JSON.parse(localStorage.getItem('todos'))
}

function addTodo(text) {
  const todo = {
    text,
    done: false,
    id: `${Math.random()}`
  }

  todos.push(todo);
  updateLocal();
};

function completedTodo(id) {
  todos.forEach(todo => {
    if(todo.id === id) {
      todo.done = true;
    }
  })
}

function deleteCompletedTodo(id) {
  todos.forEach(todo => {
    if(todo.id === id) {
      todo.done = false;
    }
  })
}

function renderHTML() {
  console.log(todos);
  let html = '';
  let htmlCompleted = ''

  todos.forEach((todo, index) => {
    if (todo.done) {
      htmlCompleted += `
      <li class="todo__item__completed" data-num="${index}">
          <button class="todo-btn__completed btn-reset" data-id="${todo.id}"></button>
          <span class="todo__title__completed">${todo.text}</span>
          <span class="todo__delete" data-num="${index}" data-delete="del">${'delete'}</span>
      </li>
      `
      return;
    }
    
    html += `
    <li class="todo__item" data-num="${index}">
      <button class="todo-btn btn-reset" data-id="${todo.id}"></button>
      <span class="todo__title">${todo.text}</span>
      <span class="todo__delete" data-num="${index}" data-delete="del">${'delete'}</span>
    </li>
    `
  })
  todosNode.innerHTML = html;
  todoCompleted.innerHTML = htmlCompleted;
}


function updateLocal() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

btnNode.addEventListener('click', () => {
  const text = inputNode.value.trim();
  if (text === '') {
    return alert(`Поле не может быть пустым. 
Введите вашу задачу`)
  }
  addTodo(text);
  renderHTML();
  inputNode.value = '';
})

todosNode.addEventListener('click', (event) => {
  if (event.target.dataset.delete) {
    deleteTasks(event.target.dataset.num)
  } 
  if (event.target.tagName !== 'BUTTON') {
    return
  } else {
    const id = event.target.dataset.id;
    completedTodo(id);
    renderHTML();
    updateLocal();
  }
})

todoCompleted.addEventListener('click', (event) => {
  if (event.target.dataset.delete) {
    deleteTasks(event.target.dataset.num)
  } 
  if (event.target.tagName !== 'BUTTON') {
    return
  } 
  else {
    const id = event.target.dataset.id;
    deleteCompletedTodo(id);
    renderHTML();
    updateLocal();
  }
})

function deleteTasks(index) {
  todos.splice(index, 1);
  updateLocal();
  renderHTML();
}

document.addEventListener('DOMContentLoaded', renderHTML);