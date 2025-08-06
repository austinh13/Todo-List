export default class Projects{
    constructor(name){
        this.name = name;
        this.task = [];
    }

    addTask(Task){
        this.task.push(Task);
    }

    getTask(){
        for(let i = 0; i < task.size();i++){
            task[i].getName();
        }
    }

    getName(){
        return this.name;
    }
}