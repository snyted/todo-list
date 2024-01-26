const buttonEl = document.querySelector("#button");
const inputEl = document.querySelector("#nova-tarefa");
const containerTaks = document.querySelector(".container-tasks");
const emptyListEl = document.querySelector(".lista-vazia");

let taskMaded = document.querySelector(".t-m");
let taskCreated = document.querySelector(".t-c");

const myListArr = [];

function btnNewTask() {
  myListArr.push({ text: inputEl.value, completed: false });
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
    <p class="add-tarefa" onclick="verificarTarefa(${index})">${item.text}</p>
    <div class="button-del">
    <button name="del-btn" type="button" onclick="deletarTarefa(${index})">
    <img src="images/delete.png" alt="Lixeira" />
    </button>
    </div>
    </div> `;

    taskCreated.innerText = myListArr.length;
  });
  containerTaks.innerHTML = newTaskAdd;
}

function verificarTarefa(index) {
  myListArr[index].completed = !myListArr[index].completed;
  taskMaded.innerText = document.querySelectorAll(".tarefas-concluidas").length;
  arrToContainer();
  checkTask();
}

function deletarTarefa(index) {
  myListArr.splice(index, 1);
  arrToContainer();
  checkTask();
  taskCreated.innerText = myListArr.length;
  taskMaded.innerText = document.querySelectorAll(".tarefas-concluidas").length;
}

buttonEl.addEventListener("click", btnNewTask);
