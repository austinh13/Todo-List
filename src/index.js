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
    const submitTask = document.getElementById("taskSubmit");
    console.log("submitTask:", submitTask);

    document.body.addEventListener("click", (e) => {
        if (e.target && e.target.id === "taskSubmit") {
        console.log("Clicked");
        const newTask = createTask();
        addTaskToProject(newTask);
    }
    });

    submit.addEventListener("click", () => {
        projects.push(createNewProject());
        console.log(projects);
    })

});

function addTaskToProject(newTask){
    const taskProject = newTask.getProject();
    console.log(taskProject);
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
        createTile(tile.getName(),tile.getDate())
    }
}