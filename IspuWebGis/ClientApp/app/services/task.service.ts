import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Task } from '../classes/task';
import { TaskRequest } from '../classes/taskRequest';

import { Observable } from "rxjs/Rx";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {

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

    addNewTask(taskId_: number, userId_: number, name_: string) {

        this.tasks.push(new Task(taskId_, userId_, name_, []));
    }

    removeTask(task: Task) {
        var indexOfTask = this.tasks.indexOf(task);
        this.tasks.splice(indexOfTask, 1);
    }

    makeWay(task: TaskRequest) {
                //var body = {
        //    "time": "12-04-2020 23:11",
        //    "mode": "ShortRoute",
        //    "name": "Home - Work",
        //    "userId": "3123123",
        //    "isFavourite": false,
        //    "startPoint": {
        //        "x": 4557725.168,
        //        "y": 7760357.210
        //    },
        //    "checkpoints": [{
        //        "x": 4560930.802,
        //        "y": 7760020.759
        //    },
        //    {
        //        "x": 4560932.802,
        //        "y": 7760029.759
        //    }
        //    ],
        //    "token": "token"
        //};

        var body = <any>task;
        body["token"] = "token";
        var str = JSON.stringify(body);
        return this.http.post('http://webappbackend.azurewebsites.net/api/tasks', str)
            .map(m => {
                try {
                    let jsonresult = m.json();
                    let way = new Array<any>();
                    jsonresult.routeResult.checkpoints.forEach((cPoint: any) => {
                        cPoint.WKTPath.forEach((p: any) => way.push(p));
                    })
                    return way;
                }
                catch (e) {
                    console.log(m);
                    console.error(e);                   
                }
            }).toPromise();
;
    }

}

