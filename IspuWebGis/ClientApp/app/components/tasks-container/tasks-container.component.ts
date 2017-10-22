import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../classes/task';

@Component({
    selector: 'tasks-container',
    templateUrl: './tasks-container.component.html',
    styleUrls: ['./tasks-container.component.css'],
    providers: [TaskService]
})
export class TasksContainerComponent implements OnInit {
    tasks: Task[] = [];
    pressOnAddButton: boolean = false;

    constructor(private taskService: TaskService) {
    }

    addTask() {
        if (this.pressOnAddButton == false) {
            this.pressOnAddButton = !this.pressOnAddButton;
        }
    }

    saveTask(taskId: number, userId: number, name: string) {
        taskId = this.tasks.length + 1;
        this.taskService.addNewTask(taskId, userId, name);
        this.pressOnAddButton = false;
    }

    removeTask(task: Task) {
        this.taskService.removeTask(task);
    }

    ngOnInit() {
        this.tasks = this.taskService.getAllTasks();
    }
}