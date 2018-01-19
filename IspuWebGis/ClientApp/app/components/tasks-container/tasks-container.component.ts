import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { EsriMapService } from '../../services/esri-map.service';
import { Task } from '../../classes/task';
import { Point } from '../../classes/point';

@Component({
    selector: 'tasks-container',
    templateUrl: './tasks-container.component.html',
    styleUrls: ['./tasks-container.component.css'],
    providers: [TaskService],
    outputs: ['taskSelected']
})
export class TasksContainerComponent implements OnInit {
    tasks: Task[] = [];
    currentTask: Task;
    isTaskCreating: boolean = false;
    @Output() taskSelected: EventEmitter<Task>;

    constructor(private taskService: TaskService, private mapService: EsriMapService) {
        this.taskSelected = new EventEmitter<Task>(true);
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
        let task = new Task(1, 1, "N0 " + Date.now(), new Date(), new Array<Point>(), 0);
        this.tasks.unshift(task);
        this.selectTask(task);
        this.isTaskCreating = true;
    }

    saveTask() {
        if (this.currentTask && this.isTaskCreating) {
            this.drawTask(this.currentTask);
            this.isTaskCreating = false;
        }
    }

    deletePoint(point: Point) {
        if (this.currentTask && this.isTaskCreating) {
            let pos = -1;
            this.currentTask.points.forEach((p, i) => {
                if (p == point) {
                    pos = i;
                }
            });
            if (pos != -1) {
                this.currentTask.points.splice(pos, 1);
                this.mapService.updateMarkers(this.currentTask.points);
            }
        }
    }

    drawTask(t: Task) {
        this.taskService.makeWay(t)
            .then(() => {
                this.mapService.updateMarkers(t.points);
            })
            .then(() => {
                this.mapService.drawPolyline(t.way);
            });

    }

    removeTask(task: Task) {
        console.log('remove');
        this.taskService.removeTask(task)
            .then((isSuccess: Boolean) => {
                if (isSuccess) {
                    let index = this.tasks.findIndex(t => t.taskId == task.taskId);
                    this.tasks.splice(index, 1)
                } else {
                    console.log('Imposiible');
                }
            })
            .catch((err: any) => {
                console.error("Tasks remove failed\n" + err);
            });
    }

    clearTasks() {
        console.log("clear tasks");
        this.taskService.removeAllTasks()
            .then((isSuccess: Boolean) => {
                if (isSuccess) {
                    this.tasks = [];
                } else {
                    console.log('Imposiible');
                }
            })
            .catch((err: any) => {
                console.error("Tasks remove failed\n" + err);
            });
    }

    selectTask(t: Task) {
        this.mapService.clearMap();
        this.currentTask = t;
        if (t && t.points.length > 1) {
            this.drawTask(this.currentTask);
        }
        this.taskSelected.emit(t);
    }
}