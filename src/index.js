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

    submit.addEventListener("click", () => {
        const inp = document.getElementById("input");

            const projectFound = projects.find(p => p.getName() === inp.value);
            if(projectFound){
                alert("You can't have replicate projects!");
            }
            else{
                projects.push(createNewProject());
                console.log(projects);
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

function createNewProject(){
    const inp = document.getElementById("input");
    const Project = new project(inp.value);
    const name = inp.value;

    const tabHolder = document.getElementById("projectHolder");
    const tab = document.createElement("button");
    tab.classList.add("project");
    tab.innerHTML = name;
    tab.addEventListener("click", () => addAllTiles(name));

    tabHolder.appendChild(tab);    
    inp.value = "";
    const holderTemp = document.getElementById("addProjectHolder");
    holderTemp.classList.toggle("active");

    return Project;
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
            break;
        }
    }
    parent.remove();
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
                    }
                }
            }
            
}