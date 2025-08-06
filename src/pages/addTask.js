import project from "./project.js"
import {createProject} from "./nav.js"

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

    const submit = document.createElement("input");
    submit.type = "submit";
    submit.classList.add("submitButton");
    submit.id = "submitButton";

    holder.appendChild(input);
    holder.appendChild(submit);
    body.appendChild(holder);
}

export function createNewProject(){
    const inp = document.getElementById("input");
    const Project = new project(inp.value);
    createProject(inp.value);
    inp.value = "";
    const holderTemp = document.getElementById("addProjectHolder");
    holderTemp.classList.toggle("active");

    return Project;
}