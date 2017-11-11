import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Task } from '../classes/task';

import { Observable } from "rxjs/Rx";

@Injectable()
export class TaskService{

    private readonly GET_ALL_TASKS: string = "/api/Tasks";

    constructor(private http: Http) {
    }

    public tasks: Task[] = [
             new Task(1, 1, "Task#2", []),
             new Task(2, 2, "Task#2", []),
             new Task(3, 3, "Task#3", [])
           // etc.
       ];

    getAllTasks(): Promise<Task[]> {
        return this.http
            .get(this.GET_ALL_TASKS)
            .map(r => {
                return r.json().tasks;
            })
            .toPromise();
    }

       addNewTask(taskId_: number, userId_: number, name_: string){
            
           this.tasks.push(new Task(taskId_, userId_, name_, []));
       }

       removeTask(task: Task){
           var indexOfTask = this.tasks.indexOf(task);
           this.tasks.splice(indexOfTask, 1);
       }

   }

