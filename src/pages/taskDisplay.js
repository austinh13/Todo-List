import { add } from "date-fns";
import Task from "./task.js"
export default function createTaskDisplay(){
    const content = document.getElementById("content");

    const displayContent = document.createElement("div");
    displayContent.classList.add("displayContent");
    displayContent.id = "displayContent";
    
    content.appendChild(displayContent);
    changePage("All Task");
}

export function createTask(){
    const projectTitle = document.getElementById("currentProject");
    const taskInput = document.getElementById("taskInput");
    const taskDate = document.getElementById("datePicker");

    console.log(taskInput.value);
    console.log(taskDate.value);
    console.log(projectTitle.innerHTML);
    const newTask = new Task(taskInput.value,taskDate.value,projectTitle.innerHTML);
    createTile(taskInput.value,taskDate.value);
    return newTask;
}

function createTile(name,date){
    const taskGrid = document.getElementById("grid");
    const tile = document.createElement("div");
    tile.classList.add("tile");

    const title = document.createElement("h2");
    title.innerHTML = name;

    const taskDate = document.createElement("p");
    taskDate.innerHTML = date;

    tile.appendChild(title);
    tile.appendChild(taskDate);
    taskGrid.appendChild(tile);
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
    input.type = "text";
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