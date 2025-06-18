// const taskInput = document.getElementById('taskInput');
//     const addTaskBtn = document.getElementById('addTaskBtn');
//     const taskList = document.getElementById('taskList');

//     // Load tasks from localStorage on page load
//     window.onload = function () {
//     const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//     tasks.forEach(task => addTaskToDOM(task));
//     };

//     // Add Task Button Click
//     addTaskBtn.addEventListener('click', () => {
//     const taskText = taskInput.value.trim();
//     if (taskText) {
//         addTaskToDOM(taskText);
//         saveTask(taskText);
//         taskInput.value = '';
//     }
//     });

//     // Add task to the DOM
//     function addTaskToDOM(taskText) {
//     const li = document.createElement('li');
//     li.textContent = taskText;

//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = 'Delete';
//     deleteBtn.className = 'deleteBtn';
//     deleteBtn.onclick = () => {
//         taskList.removeChild(li);
//         removeTask(taskText);
//     };

//     li.appendChild(deleteBtn);
//     taskList.appendChild(li);
//     }

//     // Save task to localStorage
//     function saveTask(taskText) {
//     const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//     tasks.push(taskText);
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//     }

//     // Remove task from localStorage
//     function removeTask(taskText) {
//     let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
//     tasks = tasks.filter(task => task !== taskText);
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//     }



// const taskInput = document.getElementById('taskInput');
// const addTaskBtn = document.getElementById('addTaskBtn');
// const taskList = document.getElementById('taskList');
// const clearAllBtn = document.getElementById('clearAllBtn');

// let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// function saveTasks() {
//   localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// function createTaskElement(taskObj) {
//   const li = document.createElement('li');
//   if (taskObj.completed) li.classList.add('completed');

//   const span = document.createElement('span');
//   span.textContent = taskObj.text;
//   span.className = 'task-text';
//   span.onclick = () => {
//     taskObj.completed = !taskObj.completed;
//     renderTasks();
//   };

//   const deleteBtn = document.createElement('button');
//   deleteBtn.textContent = 'Delete';
//   deleteBtn.className = 'deleteBtn';
//   deleteBtn.onclick = () => {
//     if (confirm('Delete this task?')) {
//       tasks = tasks.filter(t => t.id !== taskObj.id);
//       renderTasks();
//     }
//   };

//   li.appendChild(span);
//   li.appendChild(deleteBtn);
//   return li;
// }

// function renderTasks() {
//   taskList.innerHTML = '';
//   tasks.forEach(task => {
//     const taskEl = createTaskElement(task);
//     taskList.appendChild(taskEl);
//   });
//   saveTasks();
// }

// addTaskBtn.onclick = () => {
//   const taskText = taskInput.value.trim();
//   if (!taskText) {
//     alert('Task cannot be empty!');
//     return;
//   }

//   const exists = tasks.some(t => t.text.toLowerCase() === taskText.toLowerCase());
//   if (exists) {
//     alert('Task already exists!');
//     return;
//   }

//   const newTask = {
//     id: Date.now(),
//     text: taskText,
//     completed: false
//   };

//   tasks.push(newTask);
//   renderTasks();
//   taskInput.value = '';
// };

// clearAllBtn.onclick = () => {
//   if (confirm('Are you sure you want to delete all tasks?')) {
//     tasks = [];
//     renderTasks();
//   }
// };

// // Initial render
// renderTasks();





let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearAllBtn");

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <input type="checkbox" class="completeBox" ${task.completed ? "checked" : ""} data-index="${index}">
      <span class="task-text">${task.text}</span>
      <button class="deleteBtn" data-index="${index}">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text !== "") {
    tasks.push({ text, completed: false });
    taskInput.value = "";
    saveAndRender();
  }
});

taskList.addEventListener("click", (e) => {
  const index = e.target.getAttribute("data-index");

  if (e.target.classList.contains("deleteBtn")) {
    tasks.splice(index, 1);
  }

  if (e.target.classList.contains("completeBox")) {
    tasks[index].completed = e.target.checked;
  }

  saveAndRender();
});

clearBtn.addEventListener("click", () => {
  tasks = [];
  saveAndRender();
});

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

renderTasks();
