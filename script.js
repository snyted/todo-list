const buttonEl = document.querySelector("#button");
const inputEl = document.querySelector("#nova-tarefa");
const containerTasks = document.querySelector(".container-all-tasks");
const emptyListEl = document.querySelector(".lista-vazia");
const formEl = document.querySelector(".input-form");

let taskMaded = document.querySelector(".t-m");
let taskCreated = document.querySelector(".t-c");

let myList = [];

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  btnNewTask();
});

function btnNewTask() {
  // Se estiver vazio, retorna.
  if (inputEl.value.trim() === "") return;

  // Adiciona nova tarefa na lista.
  myList.push({ text: inputEl.value, isComplete: false });

  // Limpa o input e dá foco nele.
  inputEl.value = "";
  inputEl.focus();

  renderTasks();
}

function renderTasks() {
  let newTaskAdd = "";

  // Reordena as tarefas para que as incompletas fiquem no topo.
  reorderTasks();
  checkTask();

  myList.forEach((item, index) => {
    newTaskAdd += `   
      <div class="task-container ${
        item.isComplete && "done"
      }">
        <div class="task " onclick="taskVerifying(${index})">
          <span class="${item.isComplete ? 'check-done' : 'check'}"></span>
          <p class="task-text"> ${item.text} </p>
        
        </div>
        <button class="del-task" type="button" onclick="delTask(${index})">
          <img src="images/trash.svg" alt="Lixeira" class="trash-image"/>
        </button>
      </div>
      `;
  });

  containerTasks.innerHTML = newTaskAdd;
  localStorage.setItem("lista", JSON.stringify(myList));
}

function taskVerifying(index) {
  myList[index].isComplete = !myList[index].isComplete;
  renderTasks();
}

function delTask(index) {
  myList.splice(index, 1);

  renderTasks();
}

function localStorageMethod() {
  const tasksLocalStorage = localStorage.getItem("lista");

  if (tasksLocalStorage) {
    myList = JSON.parse(tasksLocalStorage);
  }

  renderTasks();
}

function checkTask() {
  myList.length
    ? (emptyListEl.style.display = "none")
    : (emptyListEl.style.display = "flex");
  taskMaded.textContent = myList.filter((item) => item.isComplete).length;
  taskCreated.textContent = myList.length;
  console.log(myList.length);
}

function reorderTasks() {
  myList.sort((a, b) => a.isComplete - b.isComplete);
}

localStorageMethod();
