export class Task {
    taskId: number;
    userId: number;
    name: string;
    //time: Date;
    //route: geometry;
    //isFavorite: boolean;
    //mode: string;

    constructor(public taskId_: number, public userId_: number, public name_: string) {
        this.taskId = taskId_;
        this.userId = userId_;
        this.name = name_;
    }
}