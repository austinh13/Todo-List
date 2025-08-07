// #D3EFBD
// #D2D4C8
// #E0E2DB

import nav, {createProject} from "./pages/nav.js"
import addTask, {createNewProject} from "./pages/addTask.js"
import taskDisplay, {createTask} from "./pages/taskDisplay.js"
import task from "./pages/task.js";

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