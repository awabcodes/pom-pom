export class TaskModel {
 
    constructor(public name: string,
                public totalPomodoros: number = 0,
                public isFinished: boolean = false) {
 
    }
 
}