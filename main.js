let addButton = document.querySelector(".add");
let input = document.querySelector(".input");
let tasks = document.querySelector(".tasks");
let deleteAllBtn = document.querySelector(".delete-all");
let deleteSelectedBtn = document.querySelector(".delete-selected");
let arrayOfTasks = [];
let form = document.getElementById("form");
function renderToDom() {
  tasks.innerHTML = "";
  if (window.localStorage.getItem("tasks")) {
    arrayOfTasks = getLocalStorage();
    arrayOfTasks.map((ele) => {
      addingTasksTodiv(ele);
    });
  }
}
renderToDom();
function getLocalStorage() {
  let tasks = localStorage.getItem("tasks");
  if (tasks) {
    return JSON.parse(tasks);
  } else {
    return [];
  }
}
// addButton.onclick = function () {
//   if (input.value !== "") {
//     if (input.value.length <= 18) {
//       addingTasksToArray(input.value);
//       deleteAllBtn.style.display = "flex";
//     } else {
//       Swal.fire({
//         title: "The task is too long!",
//         icon: "warning",
//       });
//     }
//   } else {
//     Swal.fire({
//       title: "You must write something!",
//       icon: "warning",
//     });
//   }
//   input.value = "";
// };
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let form = e.target;
  let title, text;
  title = form.title.value;
  text = form.text.value;
  addingTasksToArray(title, text);
  form.reset();
});

function addingTasksToArray(title, text) {
  let previousTasks = getLocalStorage();
  let obj = {
    id: previousTasks.length || 0,
    title: title,
    text: text,
    completed: false,
  };
  previousTasks.push(obj);
  localStorage.setItem("tasks", JSON.stringify(previousTasks));
  addingTasksTodiv(obj);
}

function addingTasksTodiv({ id, title, text, completed }) {
  let divContainer = document.createElement("div");
  divContainer.classList.add("task-container");
  let div = document.createElement("div");
  div.classList.add("task");
  let titleContainer = document.createElement("div");
  titleContainer.classList.add("title-container");
  let checkImg = document.createElement("img");
  checkImg.src = "./Images/unchecked.png";
  checkImg.alt = "Unchecked";
  checkImg.classList.add("pointer");
  if (completed) {
    checkImg.src = "./Images/checked.png";
    checkImg.alt = "checked";
  }
  checkImg.addEventListener("click", (e) => done(e, id));
  titleContainer.appendChild(checkImg);
  let newTitle = document.createElement("p");
  newTitle.textContent = title;
  newTitle.classList.add("task-title");
  if (completed) {
    newTitle.classList.add("done");
  }
  titleContainer.appendChild(newTitle);
  div.appendChild(titleContainer);
  divContainer.appendChild(div);

  //deleting options
  divContainer.setAttribute("taskId", id);
  let delButton = document.createElement("button");
  delButton.innerText = "Delete";
  delButton.classList.add("button");
  delButton.classList.add("scale");
  div.appendChild(delButton);
  delButton.addEventListener("click", function (e) {
    divContainer.remove();
    deletingElementFromLocStorage(id);
  });
  let newText = document.createElement("p");
  newText.innerText = text || "no description";
  divContainer.appendChild(newText);
  tasks.appendChild(divContainer);
}

function deletingElementFromLocStorage(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

deleteAllBtn.addEventListener("click", (e) => {
  window.localStorage.removeItem("tasks");
  renderToDom();
});
deleteSelectedBtn.addEventListener("click", (e) => {
  let newTasks = getLocalStorage();
  let filteredTasks = newTasks.filter((ele) => ele.completed != true);
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
  renderToDom();
});

function done(e, id) {
  let target = e.target;
  let p = target.parentNode.children[1];
  p.classList.toggle("done");
  if (p.classList.contains("done")) {
    target.src = "./Images/checked.png";
    selectingTask(id);
  } else {
    deSelectingTask(id);
    target.src = "./Images/unchecked.png";
  }
}
function selectingTask(id) {
  let tasks = getLocalStorage();
  tasks.map((ele) => {
    if (ele.id == id) {
      ele.completed = true;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function deSelectingTask(id) {
  let tasks = getLocalStorage();
  tasks.map((ele) => {
    if (ele.id == id) {
      ele.completed = false;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
