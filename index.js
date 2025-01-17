const taskNameInpEl = document.getElementById("task-name-inp");
const taskAddBtnEl = document.getElementById("task-add-btn");
const taskListEl = document.getElementById("taskList");
const doneListEl = document.getElementById("doneList");

let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

tasks.forEach((element) => {
  const newEl = createNewElement(element);
  taskListEl.appendChild(newEl);
});

taskAddBtnEl.addEventListener("click", () => {
  const name = taskNameInpEl.value.trim();

  if (!name) {
    alert("Vazifa nomi bo‘sh bo‘lishi mumkin emas.");
    return;
  }

  if (tasks.includes(name)) {
    alert("Bu vazifa allaqachon qo'shilgan.");
    return;
  }

  const newEl = createNewElement(name);
  taskNameInpEl.value = "";

  taskListEl.appendChild(newEl);
  tasks.push(name);
  localStorage.setItem("tasks", JSON.stringify(tasks));
});

function createNewElement(title) {
  const newEl = document.createElement("li");
  newEl.innerHTML = `    
    <span>${title}</span>
    <span>
      <img class="true-img" src="./images/true.svg" alt="Bajarildi" onclick="completeTask(event)" />
      <img class="task-img" src="./images/clear.svg" alt="O'chirish" onclick="deleteTask(event)" />
    </span>`;
  return newEl;
}

function deleteTask(e) {
  const taskItem = e.target.closest("li");
  const taskName = taskItem.querySelector("span").innerText;

  taskItem.remove();

  tasks = tasks.filter((item) => item !== taskName);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function completeTask(e) {
  const taskItem = e.target.closest("li");

  taskItem.querySelector("span").style.textDecoration = "line-through";
  taskItem.querySelector("span").style.color = "green";

  taskItem.querySelector(".true-img").remove();
  taskItem.querySelector(".task-img").remove();

  doneListEl.appendChild(taskItem);
}
