let addButton = document.querySelector(".add");
let input = document.querySelector(".input");
let tasks = document.querySelector(".tasks");
let deleteAllBtn = document.querySelector(".delete-all button");
let arrayOfTasks = [];

if (window.localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
  addingTasksTodiv(arrayOfTasks);
  if (JSON.parse(window.localStorage.getItem("tasks")).length > "0") {
    deleteAllBtn.style.display = "flex";
  }
}

addButton.onclick = function () {
  if (input.value !== "") {
    if (input.value.length <= 18) {
      addingTasksToArray(input.value);
      deleteAllBtn.style.display = "flex";
    } else {
      Swal.fire({
        title: "The task is too long!",
        icon: "warning",
      });
    }
  } else {
    Swal.fire({
      title: "You must write something!",
      icon: "warning",
    });
  }
  input.value = "";
};

function addingTasksToArray(inputValue) {
  let obj = {
    id: Date.now(),
    title: inputValue,
    completed: false,
  };
  arrayOfTasks.push(obj);
  addingTasksTodiv(arrayOfTasks);
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function addingTasksTodiv(allTasks) {
  tasks.innerHTML = "";
  allTasks.forEach((task) => {
    let divContainer = document.createElement("div");
    let div = document.createElement("div");
    let checkImg = document.createElement("img");
    div.className = "text";
    checkImg.src = "./Images/unchecked.png";
    checkImg.alt = "Unchecked";
    div.appendChild(checkImg);
    if (task.completed) {
      divContainer.className = "checked";
      checkImg.src = "./Images/checked.png";
    }
    let divText = document.createTextNode(task.title);
    div.appendChild(divText);
    divContainer.appendChild(div);
    divContainer.setAttribute("taskId", task.id);
    let delButton = document.createElement("button");
    let delButtonText = document.createTextNode("Delete");
    delButton.appendChild(delButtonText);
    divContainer.appendChild(delButton);
    delButton.addEventListener("click", function (e) {
      divContainer.remove();
      deletingElementFromLocStorage(
        e.currentTarget.parentElement.getAttribute("taskId")
      );
      if (JSON.parse(window.localStorage.getItem("tasks")).length == "0") {
        window.localStorage.removeItem("tasks");
        deleteAllBtn.style.display = "none";
      }
    });
    tasks.appendChild(divContainer);
  });
}

function deletingElementFromLocStorage(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

deleteAllBtn.addEventListener("click", (e) => {
  window.localStorage.removeItem("tasks");
  tasks.innerHTML = "";
  e.target.style.display = "none";
});

tasks.addEventListener("click", (e) => {
  if (
    e.target &&
    e.target.children &&
    e.target.children[0] &&
    e.target.children[0].children &&
    e.target.children[0].children[0]
  ) {
    e.target.classList.toggle("checked");
    toggleChecked(e.target.getAttribute("taskId"));
    if (e.target.classList.contains("checked")) {
      e.target.children[0].children[0].src = "./Images/checked.png";
    } else {
      e.target.children[0].children[0].src = "./Images/unchecked.png";
    }
  }
});

function toggleChecked(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
