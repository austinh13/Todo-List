export default class Projects{
    constructor(name){
        this.name = name;
        this.task = [];
    }

    addTask(Task){
        this.task.push(Task);
    }

    getTask(){
        return this.task;
    }

    getName(){
        return this.name;
    }
}