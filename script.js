const buttonEl = document.querySelector("#button");
const inputEl = document.querySelector("#nova-tarefa");
const containerTasks = document.querySelector(".container-tasks");
const emptyListEl = document.querySelector(".lista-vazia");
const formEl = document.querySelector(".input-form");

let taskMaded = document.querySelector(".t-m");
let taskCreated = document.querySelector(".t-c");

let myList = [];

function reorderTasks() {
  myList.sort((a, b) => a.isComplete - b.isComplete);
  arrToContainer();
}

function arrToContainer() {
  let newTaskAdd = "";
  myList.forEach((item, index) => {
    let itemCompleted = "";
    let divTarefas = "tarefas";
    let checkDone = "check";

    if (item.isComplete) {
      itemCompleted = "tarefas-concluidas";
      divTarefas = "";
      checkDone = "check-done";
    }

    newTaskAdd =
      newTaskAdd +
      `   
      <div class="${divTarefas} ${itemCompleted} both" onclick="taskVerifying(${index})">
      <span class="${checkDone}"></span>
            <p class="add-tarefa">
            ${item.text} </p>
            <div class="button-del">
              <button
                class="del-btn"
                type="button"
                onclick="delTask(${index})">
                  <img src="images/trash.svg" alt="Lixeira" />
                </button>
            </div>
          </div>
      `;

    taskCreated.innerText = myList.length;
  });

  containerTasks.innerHTML = newTaskAdd;
  localStorage.setItem("lista", JSON.stringify(myList));
}

function taskVerifying(index) {
  if (myList[index].isComplete) {
    myList[index].isComplete = false;
    taskMaded.textContent--;
  } else {
    myList[index].isComplete = true;
    taskMaded.textContent++;
  }
  arrToContainer();
  checkTask();
}

function delTask(index) {
  myList.splice(index, 1);
  arrToContainer();
  checkTask();
  taskCreated.innerText = myList.length;
  taskMaded.innerText = document.querySelectorAll(".tarefas-concluidas").length;
}

buttonEl.addEventListener("click", btnNewTask);
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  btnNewTask();
});

function btnNewTask() {
  if (inputEl.value.trim() === "") return;
  myList.push({ text: inputEl.value, isComplete: false });

  inputEl.value = "";
  inputEl.focus();

  arrToContainer();
  checkTask();
}

function localStorageMethod() {
  const tasksLocalStorage = localStorage.getItem("lista");

  if (tasksLocalStorage) {
    myList = JSON.parse(tasksLocalStorage);
  }

  checkTask();
  arrToContainer();
}

function checkTask() {
  myList.length ? (emptyListEl.style.display = "none") : "block";
}

localStorageMethod();

console.log(myList);
