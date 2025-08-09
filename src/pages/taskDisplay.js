import { add } from "date-fns";
import Task from "./task.js"
import {
  projects,
  storeProject,
  deleteTask
} from '../index.js';

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

    const newTask = new Task(taskInput.value,taskDate.value,projectTitle.innerHTML);
    createTile(taskInput.value,taskDate.value,projectTitle.innerHTML);
    return newTask;
}

export function createTile(name,date,project){
    const taskGrid = document.getElementById("grid");
    const tile = document.createElement("div");
    tile.dataset.value = project;
    tile.classList.add("tile");

    const title = document.createElement("h2");
    title.innerHTML = name;

    const taskDate = document.createElement("p");
    taskDate.innerHTML = date;

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.innerHTML = "Delete";
    deleteButton.id = "deleteButton";
    deleteButton.value = name;
    deleteButton.onclick = () => deleteTask(deleteButton);

    tile.appendChild(title);
    tile.appendChild(taskDate);
    tile.appendChild(deleteButton);
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

    submitForm.onclick = () => submitTask();

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

function submitTask(){
            const projectTitle = document.getElementById("currentProject");
            const taskInput = document.getElementById("taskInput");
            const taskDate = document.getElementById("datePicker");

            let cProject = projects.find(p => p.getName() === projectTitle.innerHTML); 
            if(!cProject){
                alert("You must select or create a project!");
            }
            else{

                if(taskDate.value == "" || taskInput.value == ""){
                    alert("Must fill in task name or date!");
                }
                else{
                    let taskFound = cProject.getTask().find(t => t.getName() === taskInput.value);
                    if(taskFound){
                        alert("You can't duplicate task in the same project!");
                    }
                    
                    else{
                        const newTask = createTask();
                        addTaskToProject(newTask); 
                        storeProject();           
                    }
                }
            } 
}

function addTaskToProject(newTask){
    const taskProject = newTask.getProject();

    for(let i = 0; i < projects.length;i++){
        console.log(projects[i].getName());
        if(projects[i].getName() == taskProject){
            projects[i].addTask(newTask);
        }
    }
}