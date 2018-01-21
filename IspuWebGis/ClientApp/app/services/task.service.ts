import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Task } from '../classes/task';
import { TaskRequest } from '../classes/taskRequest';
import { GeocoderService } from './geocoder.service';
import { CoordinatesService } from './coordinates.service';

import { Observable } from "rxjs/Rx";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {
    private static readonly DOMAIN = "http://webappbackend.azurewebsites.net";
    private static readonly ROUTE_PREFIX = "/api/tasks";
    private static readonly TOKEN = "token";
    private static readonly TOKEN_URI = "?token=" + TaskService.TOKEN;


    private static readonly ALL_TASKS: string = `${TaskService.DOMAIN}${TaskService.ROUTE_PREFIX}${TaskService.TOKEN_URI}`;
    private static readonly REMOVE_TASK: string = `${TaskService.DOMAIN}${TaskService.ROUTE_PREFIX}${TaskService.TOKEN_URI}&taskId=`;

    constructor(private http: Http,
        private geocoderService: GeocoderService,
        private coordinatesService: CoordinatesService) {

    }

    public tasks: Task[] = [
        //new Task(1, 1, "Task#2", new Date(), []),
        //new Task(2, 2, "Task#2", new Date(), []),
        //new Task(3, 3, "Task#3", new Date(), []),
        // etc.
    ];

    getAllTasks(): Promise<Task[]> {
        return this.http
            .get(TaskService.ALL_TASKS)
            .map((r: any) => r.json())
            .toPromise()
            .then((resTasks: any) => {
                let promises = new Array<Promise<Task>>();
                resTasks.forEach((t: any) => {
                    console.log(t);
                    let checkpoints = t.checkpoints;
                    let promise = this.coordinatesService
                        .convertToPoints(checkpoints)
                        .then((points) => {
                            points.forEach((point) => {
                                this.geocoderService.getReverseGeocodeByPoint(point)
                                    .subscribe((data: any) => {
                                        if (data.address)
                                            point.address = data.address.ShortLabel;
                                    });
                            });
                            return new Task(t.taskId, t.UserId, t.name, t.time, points, t.Length, false)
                        })
                    promises.push(promise);
                });
                return Promise.all(promises)
                    .then((tasks) => tasks);
            });
    }

    addNewTask(taskId_: number, userId_: number, name_: string) {

        this.tasks.push(new Task(taskId_, userId_, name_, new Date(), [], 0, true));
    }

    removeTask(task: Task): Promise<Boolean> {
        let url = TaskService.REMOVE_TASK + task.taskId;
        return this.http
            .delete(url)
            .map(r => {
                console.log(r);
                return r.text() == "Success";
            })
            .toPromise();
    }

    removeAllTasks(): Promise<Boolean> {
        return this.http
            .delete(TaskService.ALL_TASKS)
            .map(r => {
                console.log(r);
                return r.text() == "Success";
            })
            .toPromise();
    }

    makeWay(task: Task) {
        let jsonresult_: any;
        return this.coordinatesService.convertToClientPoints(task.points)
            .then((clientPoints) => {
                var taskRequest = new TaskRequest();
                taskRequest.isFavourite = false;
                taskRequest.startPoint = clientPoints[0];
                //clientPoints.shift();
                taskRequest.checkpoints = clientPoints;
                taskRequest.name = task.name;
                taskRequest.time = task.time;
                taskRequest.userId = 1;
                taskRequest.mode = "ShortRoute";
                taskRequest.saveTask = task.saveTask;
                return this.makeWayRequest(taskRequest);
            })
            .then((jsonresult) => {
                let way = new Array<any>();
                jsonresult_ = jsonresult;
                jsonresult.routeResult.checkpoints.forEach((cPoint: any) => {
                    cPoint.WKTPath.forEach((p: any) => way.push(p));
                });
                task.totalLength = jsonresult.routeResult.totalLength;              
                return this.coordinatesService.convertToPoints(way)
            })
            .then((way) => {               
                task.way = way;
            }).then(() => {
                let points = new Array<any>();
                jsonresult_.routeResult.checkpoints.forEach((cPoint: any) => {
                    if (cPoint.WKTPath[0]) {
                        points.push(cPoint.WKTPath[0]);
                    }
                });
                let len = jsonresult_.routeResult.checkpoints.length;
                let WKTPath = jsonresult_.routeResult.checkpoints[len - 1].WKTPath;
                if (WKTPath[WKTPath.length - 1]) {
                    points.push(WKTPath[WKTPath.length - 1]);
                }
                return this.coordinatesService.convertToPoints(points);
            }).then((points) => {
                task.points = points;
                return points;
            })
            .then((points) => {
                points.forEach((point) => {
                    this.geocoderService.getReverseGeocodeByPoint(point)
                        .subscribe((data: any) => {
                            if (data.address)
                                point.address = data.address.ShortLabel;
                        });
                })
            });
    }

    makeWayRequest(task: TaskRequest) { 
        var body = <any>task;
        body["token"] = TaskService.TOKEN;
        var str = JSON.stringify(body);
        return this.http.post('http://webappbackend.azurewebsites.net/api/tasks', str)
            .map((m: any) => {
                try {
                    let jsonresult = m.json();
                    console.log(m); 
                    console.log(jsonresult);         
                    return jsonresult;
                }
                catch (e) {
                    console.log(m);
                    console.error(e);                   
                }
            }).toPromise();
    }

}

