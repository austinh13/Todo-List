// #D3EFBD
// #D2D4C8
// #E0E2DB

import nav from "./pages/nav.js"
import addTask from "./pages/addTask.js"
import taskDisplay, {changePage, createTask,createTile} from "./pages/taskDisplay.js"
import task from "./pages/task.js";
import project from "./pages/project.js";

import "./styles/bodyStyle.css"
import "./styles/navStyle.css"
import "./styles/taskStyle.css"
import "./styles/taskDisplayStyle.css"

const projects = [];

document.addEventListener("DOMContentLoaded", () => {

    nav();
    addTask();
    taskDisplay();

    const submit = document.getElementById("submitButton");
    const deleteButton = document.getElementById("deleteButton");

    document.body.addEventListener("click", (e) => {
        if (e.target && e.target.id === "taskSubmit") {
        const newTask = createTask();
        addTaskToProject(newTask);
    }
    });

    document.body.addEventListener("click", (e) => {
        if (e.target && e.target.id === "allTab") {
        changePage("All Task")
        addAllTask();
    }
    });

    document.body.addEventListener('click',(e) => {
        if (e.target && e.target.id === "deleteButton") {
            deleteTask(e.target);
        }
        });

    submit.addEventListener("click", () => {
        projects.push(createNewProject());
        console.log(projects);
    })

});

function addTaskToProject(newTask){
    const taskProject = newTask.getProject();

    for(let i = 0; i < projects.length;i++){
        console.log(projects[i].getName());
        if(projects[i].getName() == taskProject){
            projects[i].addTask(newTask);
        }
    }
}

function createNewProject(){
    const inp = document.getElementById("input");
    const Project = new project(inp.value);
    createProject(inp.value);
    inp.value = "";
    const holderTemp = document.getElementById("addProjectHolder");
    holderTemp.classList.toggle("active");

    return Project;
}

function createProject(name){
    const tabHolder = document.getElementById("projectHolder");
    const tab = document.createElement("button");
    tab.classList.add("project");
    tab.innerHTML = name;
    tab.addEventListener("click", () => addAllTiles(name));

    tabHolder.appendChild(tab);
}

function addAllTiles(name){
    let allTask;
    for(let i = 0; i < projects.length;i++){
        console.log(projects[i].getName());
        if(projects[i].getName() == name){
             allTask = projects[i].getTask();
        }
    }
    changePage(name);
    for(let i = 0; i < allTask.length;i++){
        const tile = allTask[i];
        createTile(tile.getName(),tile.getDate(),tile.getProject())
    }
}

function addAllTask(){
    for(let i = 0; i < projects.length;i++){
        for(let j = 0; j < projects[i].getTask().length;j++){
            const task = projects[i].getTask();
            const tile = task[j];
            createTile(tile.getName(),tile.getDate(),tile.getProject())
        }
    }
}

function deleteTask(target){
    const taskName = target.value;
    const parent = target.parentNode;
    const projectName = parent.dataset.value;
    
    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];

        if (project.getName() === projectName) {
            const tasks = project.getTask();

            if (Array.isArray(tasks)) {
            const filtered = tasks.filter(task => {return task && task.getName() !== taskName;});

            project.task = filtered;
            }

            break; // Stop loop once project is found
        }
    }
    parent.remove();
}