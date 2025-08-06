// #D3EFBD
// #D2D4C8
// #E0E2DB

import nav, {createProject} from "./pages/nav.js"
import addTask, {createNewProject} from "./pages/addTask.js"
import taskDisplay from "./pages/taskDisplay.js"


import "./styles/bodyStyle.css"
import "./styles/navStyle.css"
import "./styles/taskStyle.css"
import "./styles/taskDisplayStyle.css"

document.addEventListener("DOMContentLoaded", () => {
    const projects = [];

    nav();
    addTask();
    taskDisplay();

    const submit = document.getElementById("submitButton");
    const submitTask = document.getElementById("taskSubmit");
    submitTask.addEventListener("click", () => {
        
    });
    submit.addEventListener("click", () => {
        projects.push(createNewProject());
        console.log(projects);
    })

});