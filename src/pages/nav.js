
import icon from "../images/icon.png"
import homeIcon from "../images/homeIcon.png"
import paperIcon from "../images/paperIcon.png"
import notepadIcon from "../images/notepadIcon.png"
import {changePage} from "./taskDisplay.js"

export default function createNav(){

    const content = document.getElementById("content");

    const nav = document.createElement("div");
    nav.classList.add("nav");

    const tabHolder = document.createElement("div");
    tabHolder.classList.add("tabHolder");

    const user = createUser("Your Username");
    const allTab = createTab("All Task",homeIcon)
    const projectTab = createTab("Projects",paperIcon)
    const noteTab = createTab("Notes",notepadIcon)

    const projectHolder = document.createElement("div");
    projectHolder.classList.add("projectHolder");
    projectHolder.id = "projectHolder"

    const buttonHolder = document.createElement("div");
    buttonHolder.classList.add("buttonHolder");

    const addButton = document.createElement("button");
    addButton.classList.add("addButton");
    addButton.innerHTML = "+";
    addButton.onclick = function(){
        const addTaskHolder = document.getElementById("addProjectHolder");
        addTaskHolder.classList.toggle("active");
    }
    buttonHolder.appendChild(addButton);

    tabHolder.appendChild(allTab);
    tabHolder.appendChild(projectTab);
    tabHolder.appendChild(projectHolder);
    tabHolder.appendChild(noteTab);

    nav.appendChild(user);
    nav.appendChild(tabHolder);
    nav.appendChild(buttonHolder);

    content.appendChild(nav);
    

}

function createTab(name,imgSrc){
    const tab = document.createElement("button");
    tab.classList.add("tab");

    const pic = document.createElement("img");
    pic.src = imgSrc;
    pic.classList.add("tabImg");

    const tabText = document.createElement("p");
    tabText.innerHTML = name;

    tab.appendChild(pic);
    tab.appendChild(tabText);

    return tab;
}

function createUser(name){
    const user = document.createElement("div");
    user.classList.add("user");

    const userIcon = document.createElement("img");
    userIcon.classList.add("userIcon");
    userIcon.src = icon;

    const userName = document.createElement("p");
    userName.innerHTML = name;

    user.appendChild(userIcon);
    user.appendChild(userName);

    return user;
}

export function createProject(name){
    const tabHolder = document.getElementById("projectHolder");
    const tab = document.createElement("button");
    tab.classList.add("project");
    tab.innerHTML = name;
    tab.addEventListener("click", () => changePage(name));

    tabHolder.appendChild(tab);
}