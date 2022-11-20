const todosNode = document.querySelector('.todo-list__today');
const inputNode = document.querySelector('.todo__input');
const btnNode = document.querySelector('.todo__btn');
const btnCompleted = document.querySelector('.todo-btn__completed')
const todoCompleted = document.querySelector('.todo-list__complete')
let todos;

if (!localStorage.todos) {
  todos = [];
} else {
  todos = JSON.parse(localStorage.getItem('todos'));
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
    if (todo.id === id) {
      todo.done = true;
    }
  })
}

function deleteCompletedTodo(id) {
  todos.forEach(todo => {
    if (todo.id === id) {
      todo.done = false;
    }
  })
}

function renderHTML() {
  let html = '';
  let htmlCompleted = ''

  todos.forEach((todo, index) => {
    if (todo.done) {
      htmlCompleted += `
      <li class="todo-complete__item" data-num="${index}">
          <div class="todo-complete__box">
            <button class="todo-complete__btn btn-reset" data-id="${todo.id}">
            <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <g data-name="Layer 2">
              <g data-name="close">
              <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/>
              <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></g></svg>
            </button>
            <span class="todo-complete__text todo-text">${todo.text}</span>
            <input class="todo__input-edit hidden input-reset" type="text"  name="edit" placeholder="Изменить задачу">
          </div>
          <div class="todo-complete__buttons">
            <button class="todo__edit btn-reset" data-edit="edit" data-num="${index}"></button>
            <button class="todo-complete__delete todo__delete btn-reset" data-num="${index}" data-delete="del"></button>
          </div
      </li>
      `
      return;
    }

    html += `
    <li class="todo-today__item" data-num="${index}">
      <div class="todo-today__box">
        <button class="todo-today__btn btn-reset" data-id="${todo.id}">
          <svg version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
            x="0px" y="0px" width="42px" height="42px" viewBox="0 0 42 42" xml:space="preserve">
            <path d="M39.04,7.604l-2.398-1.93c-1.182-0.95-1.869-0.939-2.881,0.311L16.332,27.494l-8.111-6.739
            c-1.119-0.94-1.819-0.89-2.739,0.26l-1.851,2.41c-0.939,1.182-0.819,1.853,0.291,2.78l11.56,9.562c1.19,1,1.86,0.897,2.78-0.222
            l21.079-25.061C40.331,9.294,40.271,8.583,39.04,7.604z"/>
          </svg>
        </button>
        <div class="todo-today__text todo-text">${todo.text}</div>
        <input class="todo__input-edit hidden input-reset" type="text"  name="edit" placeholder="Изменить задачу">
      </div>
      <div class="todo-today__buttons">
        <button class="todo__edit btn-reset" data-edit="edit" data-num="${index}"></button>
        <button class="todo-today__delete todo__delete btn-reset" data-num="${index}" data-delete="del"></button>
      </div>
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
  }
  if (event.target.dataset.edit) {
    editTasks(event.target);
  }
  else {
    const id = event.target.dataset.id;
    completedTodo(id);
    renderHTML();
    updateLocal();
  }
  
});

todoCompleted.addEventListener('click', (event) => {
  if (event.target.dataset.delete) {
    deleteTasks(event.target.dataset.num)
  }
  if (event.target.tagName !== 'BUTTON') {
    return
  }
  if (event.target.dataset.edit) {

    editTasks(event.target);
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

function editTasks(self) {
  self.parentElement.parentElement.querySelector('.todo-text').classList.toggle('hidden');
  self.parentElement.parentElement.querySelector('.todo__input-edit').classList.toggle('hidden');
  self.parentElement.parentElement.querySelector('.todo__input-edit').addEventListener('input', (e) => {
    self.parentElement.parentElement.querySelector('.todo-text').textContent = e.target.value;

    todos.forEach((todo, index) => {
      if (self.parentElement.parentElement.dataset.num ==  index) {
        todo.text = e.target.value;
      }
    });

    updateLocal()
  });
}

document.addEventListener('DOMContentLoaded', renderHTML);