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

const stored = JSON.parse(localStorage.getItem('projects')) || [];
let projects = stored.map(p => {
    const proj = new project(p.name); // or however your constructor works
    if (p.task) {
        p.task.forEach(t => {
            proj.addTask(new task(t.name, t.date, t.project)); // adapt to your task class
        });
    }
    return proj;
});


document.addEventListener("DOMContentLoaded", () => {

    nav();
    addTask();
    taskDisplay();
    changePage("All Task");
    addAllProjects();
    addAllTask();


    const submit = document.getElementById("submitButton");

    document.body.addEventListener("click", (e) => {
        if (e.target && e.target.id === "taskSubmit") {
            submitTask();
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

    document.body.addEventListener('click',(e) => {
        if (e.target && e.target.id === "deleteProjectButton") {
            deleteProject(e.target);
        }
        });
    submit.addEventListener("click", () => {
        const inp = document.getElementById("input");

            const projectFound = projects.find(p => p.getName() === inp.value);
            if(projectFound){
                alert("You can't have replicate projects!");
            }
            else{
                if(inp.value == ""){
                    alert("You must have a name for the project!");
                }
                else{
                    projects.push(createNewProject(inp.value));
                    storeProject();           
                }
            }
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

function createNewProject(name){
    const inp = document.getElementById("input");
    const Project = new project(inp.value);

    addTab(inp.value);
    inp.value = "";
    const holderTemp = document.getElementById("addProjectHolder");
    holderTemp.classList.toggle("active");

    return Project;
}

function addTab(name){
    const tabHolder = document.getElementById("projectHolder");
    const tab = document.createElement("div");
    tab.classList.add("project");
    
    const projectName = document.createElement("button");
    projectName.classList.add("projectList");
    projectName.innerHTML = name;

    const deleteProjectButton = document.createElement("button");
    deleteProjectButton.classList.add("deleteProject");
    deleteProjectButton.innerHTML = "🗑️";
    deleteProjectButton.id = "deleteProjectButton";
    deleteProjectButton.dataset.value = name;

    projectName.addEventListener("click", () => addAllTiles(name));

    tab.appendChild(projectName);
    tab.appendChild(deleteProjectButton);
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
    const taskHolder = document.getElementById("taskHolder");
    taskHolder.innerHTML = "";
    for(let i = 0; i < projects.length;i++){
        for(let j = 0; j < projects[i].getTask().length;j++){
            const task = projects[i].getTask();
            const tile = task[j];
            createTile(tile.getName(),tile.getDate(),tile.getProject())
        }
    }
}

function deleteProject(target){
    const name = target.dataset.value;
    const filtered = projects.filter(project => {return project && project.getName() !== name});
    projects = filtered;
    storeProject();
    addAllProjects();
    
    let parent = target.parentNode;
    parent.remove();
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
            break;
        }
    }
    parent.remove();
    storeProject();
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

function addAllProjects(){
    const tabHolder = document.getElementById("projectHolder");
    tabHolder.innerHTML = ""; // Clear before re-adding
    for(let i = 0; i < projects.length;i++){
        addTab(projects[i].getName());
    }
}

// from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

function storeProject(){
    if(storageAvailable('localStorage')){
        localStorage.setItem('projects', JSON.stringify(projects));
    }
    else{
        alert("Data not stored!");
    }
}
