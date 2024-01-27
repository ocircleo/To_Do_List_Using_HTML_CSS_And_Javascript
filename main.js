let addButton = document.querySelector(".add");
let input = document.querySelector(".input");
let tasks = document.querySelector(".tasks");
let arrayOfTasks = [];
if (window.localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
  addingTasksTodiv(arrayOfTasks);
}
addButton.onclick = function () {
  if (input.value !== "") {
    addingTasksToArray(input.value);
  }
  input.value = "";
}
function addingTasksToArray(inputValue) {
  let obj = {
    id: Date.now(),
    title: inputValue,
  };
  arrayOfTasks.push(obj);
  addingTasksTodiv(arrayOfTasks);
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function addingTasksTodiv(allTasks) {
  tasks.innerHTML = "";
  allTasks.forEach((task) => {
    let div = document.createElement("div");
    let divText = document.createTextNode(task.title);
    div.appendChild(divText);
    div.setAttribute("taskId", task.id);
    let delButton = document.createElement("button");
    let delButtonText = document.createTextNode("Delete");
    delButton.appendChild(delButtonText);
    div.appendChild(delButton);
    delButton.addEventListener("click", function (e) {
      div.remove();
      deletingElementFromLocStorage(e.currentTarget.parentElement.getAttribute("taskId"));
    })
    tasks.appendChild(div);
  });
}
function deletingElementFromLocStorage(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}