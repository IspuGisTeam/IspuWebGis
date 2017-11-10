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

    ngOnInit() {
        this.taskService.getAllTasks()
            .then((ta: Task[]) => this.tasksLoadedSuccess(ta))
            .catch((err: any) => this.tasksLoadedFail(err));
    }

    private tasksLoadedSuccess(tasks: Task[]) {
        this.tasks = tasks;
    }

    private tasksLoadedFail(err: any) {
        console.error("Tasks loading failed\n" + err);
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
}