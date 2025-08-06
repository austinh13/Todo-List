export default class Task{
    constructor(name,date,project){
        this.name = name;
        this.date = date;
        this.project = project;
    }

    setName(name){
        this.name = name;
    }

    getName(){
        return this.name;
    }

    setDate(date){
        this.date = date;
    }

    getDate(){
        return this.date;
    }

    getProject(){
        return this.project;
    }
}