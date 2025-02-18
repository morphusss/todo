const addToDo = document.getElementById("create-todo");
const toDoValue = document.getElementById("input-todo");

let archiveButtonMode = true;
const showArchive = document.getElementById("open-archive");
const createToDoWrapper = document.getElementById("todo-create-wrapper");
const separatorForToDo = document.getElementById("sep");
showArchive.addEventListener("click", () => {

    switch(archiveButtonMode){
        case(true):

        storageActiveToDo.replaceChildren('', '');
        showArchive.innerText = "Close";
        createToDoWrapper.style.visibility = "hidden";
        separatorForToDo.style.visibility = "hidden";


        for (let key in localStorage) {
            if(key.includes("archive_")){
                let text = JSON.parse(localStorage.getItem(key));
                let objStorage = {
                    value: text.value,
                    priority: text.priority
                };
                console.log(text);
                createVisualForTask(objStorage.value, key, 1, 0.8, JSON.stringify(objStorage), objStorage.priority);
            };
        };
        
        archiveButtonMode = false;
        console.log("Archive opened");
        break;

        case(false):

        storageActiveToDo.replaceChildren('', '');
        showArchive.innerText = "Archive";
        archiveButtonMode = true;

        createToDoWrapper.style.visibility = "visible";
        separatorForToDo.style.visibility = "visible";

        for (let key in localStorage) {
            if(!key.includes("archive_")){
                let text = JSON.parse(localStorage.getItem(key));
                let objStorage = {
                    value: text.value,
                    priority: text.priority
                };
                console.log(text);
                createVisualForTask(objStorage.value, key, 0, 1, JSON.stringify(objStorage), objStorage.priority);
            };
        };
        break;
    }
});

let taskCounter = 1;

addToDo.addEventListener("click", () => {
    let objStorage = {
        value: toDoValue.value,
        priority: checkPriority()
    };
    let output = toDoValue.value;
    localStorage.setItem(`task_${taskCounter}`, JSON.stringify(objStorage));
    
    createVisualForTask(output, `task_${taskCounter}`, 0, 1,  JSON.stringify(objStorage), checkPriority());
    taskCounter += 1;
    checkPriority();
});


const storageActiveToDo = document.getElementById("storage-active-todo");

function createVisualForTask(value, store, buttonMode, transparent, valueStore, priority) {
    const newTodo = document.createElement("section");
    newTodo.classList.add("task-body"); 

    const taskName = document.createElement("section");
    taskName.classList.add("task-field");
    taskName.style.opacity = transparent; 
    taskName.innerText = value;

    const archiveButton = document.createElement("button");
    archiveButton.style.opacity = transparent;
    archiveButton.classList.add("task-btn");
    

    let colorBar;
    switch (buttonMode) {
        case(0):
            archiveButton.innerText = "-";
            archiveButton.addEventListener("click", () => {
                newTodo.remove();
                localStorage.removeItem(store);
                localStorage.setItem("archive_" + store, valueStore);
            });
            break;
        case(1):
            archiveButton.innerText = "x";
            archiveButton.addEventListener("click", () => {
                newTodo.remove();
                localStorage.removeItem(store);
            });
        default:
            break;
    };

    switch (priority) {
        case("red-priority"):
            colorBar = "#E63946";
            break;
        case("yellow-priority"):
            colorBar = "#ffb703";
            break;
        case("gray-priority"):
        default:
            colorBar = "#E0E1DD";
            break;
    };

    const priorityBar = document.createElement("div");
    priorityBar.classList.add("horizontal-separator");
    priorityBar.style.border = `1px solid ${colorBar}`;
    priorityBar.style.borderRadius = "14px";
    priorityBar.style.marginBottom = 0;
    priorityBar.style.marginTop = "1%";


    taskName.append(priorityBar);
    newTodo.append(taskName, archiveButton);
    storageActiveToDo.append(newTodo);
}

const redType = document.getElementById("red-priority");
const yellowType = document.getElementById("yellow-priority");
const grayType = document.getElementById("gray-priority");

redType.value = "off";
yellowType.value = "off";
grayType.value = "on";

function checkPriority(){

    redType.addEventListener("change", () => {
        redType.value = "on";
        yellowType.value = "off";
        grayType.value = "off";
    });

    yellowType.addEventListener("change", () => {
        redType.value = "off";
        yellowType.value = "on";
        grayType.value = "off";
    });

    grayType.addEventListener("change", () => {
        redType.value = "off";
        yellowType.value = "off";
        grayType.value = "on";
    });

    if(redType.value === "on") {
        return "red-priority";
    } else if(yellowType.value === "on") {
        return "yellow-priority";
    } else  if (grayType.value === "on"){
        return "gray-priority";
    };

}


localStorage.clear();