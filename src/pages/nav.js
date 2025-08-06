
import icon from "../images/icon.png"
import homeIcon from "../images/homeIcon.png"

export default function createNav(){

    const content = document.getElementById("content");

    const nav = document.createElement("div");
    nav.classList.add("nav");

    const user = createUser("Your Username");
    const allTab = createTab("All Task",homeIcon)

    nav.appendChild(user);
    nav.appendChild(allTab);
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