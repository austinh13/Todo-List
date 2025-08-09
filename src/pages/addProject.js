import project from "./project.js"
import {projects,deleteProject,storeProject,addAllTiles} from "../index.js";
import { addAllTask } from "../index.js";
import { changePage } from "./taskDisplay.js";

export default function createAdd(){
    const body = document.body;
    
    const holder = document.createElement("div");
    holder.classList.add("holder");
    holder.id = "addProjectHolder";

    const input = document.createElement("input");
    input.type = "form"
    input.classList.add("inputForm");
    input.placeholder = "Example: General";
    input.id = "input";
    input.maxLength = "20";

    const submit = document.createElement("button");
    submit.innerHTML = "Submit";
    submit.classList.add("submitButton");
    submit.id = "submitButton";

    submit.onclick = () => {const inp = document.getElementById("input");

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
        }
    holder.appendChild(input);
    holder.appendChild(submit);
    body.appendChild(holder);
}

function createNewProject(name){
    const inp = document.getElementById("input");
    const Project = new project(name);

    addTab(name);
    inp.value = "";
    const holderTemp = document.getElementById("addProjectHolder");
    holderTemp.classList.toggle("active");

    return Project;
}

export function addTab(name){
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

    deleteProjectButton.onclick = () => {deleteProject(deleteProjectButton),changePage("All Task"),addAllTask()};
    
    projectName.onclick = () => addAllTiles(name);

    tab.appendChild(projectName);
    tab.appendChild(deleteProjectButton);
    tabHolder.appendChild(tab);    
}


