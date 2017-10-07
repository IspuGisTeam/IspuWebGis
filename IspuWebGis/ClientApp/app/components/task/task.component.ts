import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../services/task.service';
import { Task } from '../../classes/task';
       
@Component({
    selector: 'task-component',
    templateUrl: './task.html',
    providers: [TaskService]
})

export class TaskComponent implements OnInit { 
     
    tasks: Task[] = [];
    pressOnAddButton: boolean = false;

    constructor(private taskService: TaskService) {}
     
    addTask() {
        if (this.pressOnAddButton == false) {
            this.pressOnAddButton = true;
        } else this.pressOnAddButton = false;
    }

    saveTask(taskId: number, userId: number, name: string) {
        this.taskService.addNewTask(taskId, userId, name);
        this.pressOnAddButton = false;
    }

    removeTask(task: Task) {
        this.taskService.removeTask(task);
    }

    ngOnInit(){
        this.tasks = this.taskService.getAllTasks();
    }
}