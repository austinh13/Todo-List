export default function createTaskDisplay(){
    const content = document.getElementById("content");

    const displayContent = document.createElement("div");
    displayContent.classList.add("displayContent");
    displayContent.id = "displayContent";
    
    content.appendChild(displayContent);
    changePage("All Task");
}

function createTile(){

}

export function changePage(name){
    const content = document.getElementById("displayContent");

    while (content.firstChild) {
    content.removeChild(content.firstChild);
    }

    const header = document.createElement("h1")
    header.innerHTML = name;

    const grid = document.createElement("div");
    grid.classList.add("grid");

    content.appendChild(header);
    content.appendChild(grid);
}