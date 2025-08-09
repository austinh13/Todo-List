// #D3EFBD
// #D2D4C8
// #E0E2DB

import nav from "./pages/nav.js"
import addTask, {addTab} from "./pages/addProject.js"
import taskDisplay, {changePage, createTask,createTile} from "./pages/taskDisplay.js"
import task from "./pages/task.js";
import project from "./pages/project.js";


import "./styles/bodyStyle.css"
import "./styles/navStyle.css"
import "./styles/taskStyle.css"
import "./styles/taskDisplayStyle.css"

const stored = JSON.parse(localStorage.getItem('projects')) || [];
export let projects = stored.map(p => {
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

});


export function addAllTiles(name){
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

export function addAllTask(){
    for(let i = 0; i < projects.length;i++){
        for(let j = 0; j < projects[i].getTask().length;j++){
            const task = projects[i].getTask();
            const tile = task[j];
            createTile(tile.getName(),tile.getDate(),tile.getProject())
        }
    }
}

export function deleteProject(target){
    const name = target.dataset.value;
    const filtered = projects.filter(project => {return project && project.getName() !== name});
    projects = filtered;
    storeProject();
    addAllProjects();
    
    let parent = target.parentNode;
    parent.remove();
}

export function deleteTask(target){
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



export function addAllProjects(){
    const tabHolder = document.getElementById("projectHolder");
    tabHolder.innerHTML = ""; // Clear before re-adding
    for(let i = 0; i < projects.length;i++){
        addTab(projects[i].getName());
    }
}

// from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
export function storageAvailable(type) {
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

export function storeProject(){
    if(storageAvailable('localStorage')){
        localStorage.setItem('projects', JSON.stringify(projects));
    }
    else{
        alert("Data not stored!");
    }
}
