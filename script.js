const addTask = document.getElementById("add-task");
const taskContainer = document.getElementById("task-container");
const inputTask = document.getElementById("input-task");

let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

function renderList() {
    taskContainer.innerHTML = "";


    for (let i = 0; i < todoList.length; i++) {
        let task = document.createElement('div');
        task.classList.add("task");

        let listItem = document.createElement("li");
        listItem.textContent = todoList[i].text;

        task.appendChild(listItem);
        if (todoList[i].completed === true) {
            task.classList.add('completed');
        }

        let checkBtn = document.createElement("button");
        checkBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
        checkBtn.classList.add("checkTask");
        task.appendChild(checkBtn);

        let delBtn = document.createElement("button");
        delBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        delBtn.classList.add("deleteTask");
        task.appendChild(delBtn);



        checkBtn.addEventListener("click", function() {
            task.classList.toggle("completed");
            if (task.classList.contains("completed")) {
                todoList[i].completed = true;
            } else {
                todoList[i].completed = false;

            }
            renderList();
            localStorage.setItem('todoList', JSON.stringify(todoList));
        })
        delBtn.addEventListener("click", function(e) {
            let target = e.target;
            if (target.tagName === "I") {
                target.parentElement.parentElement.remove();
            } else {
                target.parentElement.remove();
            }
            todoList.splice(i, 1);
            renderList();
            localStorage.setItem('todoList', JSON.stringify(todoList));
        })

        taskContainer.appendChild(task);
    }
}

renderList();

addTask.addEventListener("click", function() {
    let text = inputTask.value;
    if (inputTask.value === "") {
        alert("please enter task")
    } else {
        todoList.push({
            text: text,
            completed: false
        });
        inputTask.value = "";
        renderList();
        localStorage.setItem('todoList', JSON.stringify(todoList));


    }

})