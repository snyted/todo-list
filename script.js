const buttonEl = document.querySelector("#button");
const inputEl = document.querySelector("#nova-tarefa");
const containerTaks = document.querySelector(".container-tasks");
const emptyListEl = document.querySelector(".lista-vazia");
const formEl = document.querySelector(".input-form");

let taskMaded = document.querySelector(".t-m");
let taskCreated = document.querySelector(".t-c");

let myListArr = [];

function btnNewTask() {
  inputEl.value === ""
  ? alert("Digite alguma tarefa para ser feita.")
  : myListArr.push({ text: inputEl.value, completed: false });
  inputEl.value = "";
  inputEl.focus();
  arrToContainer();
  checkTask();
}
checkTask();

function checkTask() {
  myListArr.length === 0
  ? (emptyListEl.style.display = "flex")
  : (emptyListEl.style.display = "none");
}

function arrToContainer() {
  let newTaskAdd = "";
  myListArr.forEach((item, index) => {
    const itemCompleted = item.completed ? "tarefas-concluidas" : "";
    const divTarefas = item.completed ? "" : "tarefas";
    newTaskAdd =
      newTaskAdd +
      `<div class="${divTarefas} ${itemCompleted}">
      <p class="add-tarefa" onclick="taskVerifying(${index})">${item.text}</p>
    <div class="button-del">
    <button name="del-btn" type="button" onclick="delTask(${index})">
    <img src="images/delete.png" alt="Lixeira" />
    </button>
    </div>
    </div> `;
    
    taskCreated.innerText = myListArr.length;
  });
  
  containerTaks.innerHTML = newTaskAdd;
  localStorage.setItem("lista", JSON.stringify(myListArr));
}

function taskVerifying(index) {
  if (myListArr[index].completed) {
    myListArr[index].completed = false;
    taskMaded.innerText--;
  } else {
    myListArr[index].completed = true;
    taskMaded.innerText++;
  }
  arrToContainer();
  checkTask();
}

function delTask(index) {
  myListArr.splice(index, 1);
  arrToContainer();
  checkTask();
  taskCreated.innerText = myListArr.length;
  taskMaded.innerText = document.querySelectorAll(".tarefas-concluidas").length;
}

function localStorageMethod() {
  const tasksLocalStorage = localStorage.getItem('lista');
  console.log('Valor recuperado do local storage:', tasksLocalStorage);
  if (tasksLocalStorage) {
    myListArr = JSON.parse(tasksLocalStorage);
  }
  checkTask()
  arrToContainer();
  
}

localStorageMethod();
buttonEl.addEventListener("click", btnNewTask);
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  btnNewTask();
});

