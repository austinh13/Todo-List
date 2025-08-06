import { add } from "date-fns";

export default function createTaskDisplay(){
    const content = document.getElementById("content");

    const displayContent = document.createElement("div");
    displayContent.classList.add("displayContent");
    displayContent.id = "displayContent";
    
    content.appendChild(displayContent);
    changePage("All Task");
}

function createTile(){
    const projectTitle = document.getElementById("currentProject");
    const TaskGrid = document.getElementById("grid");
}

export function changePage(name){
    const content = document.getElementById("displayContent");

    while (content.firstChild) {
    content.removeChild(content.firstChild);
    }

    const header = document.createElement("h1")
    header.innerHTML = name;
    header.id = "currentProject";

    const grid = document.createElement("div");
    grid.classList.add("grid");
    grid.id = "grid";

    const addTask = document.createElement("div");
    addTask.classList.add("addTask");

    const input = document.createElement("input");
    input.type = "form";
    input.id = "taskInput";
    input.placeholder = "Example: Do Homework";

    const submitForm = document.createElement("button");
    submitForm.id = "taskSubmit";
    submitForm.innerHTML = "Submit";

    const datePicker = document.createElement("input");
    datePicker.type = "date";
    datePicker.id = "datePicker";

    addTask.appendChild(input);
    addTask.appendChild(submitForm);
    addTask.appendChild(datePicker);

    content.appendChild(header);
    content.appendChild(grid);
    content.appendChild(addTask);
}