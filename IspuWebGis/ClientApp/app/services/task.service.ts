import { Injectable } from '@angular/core';
import { Task } from '../classes/task';

@Injectable()
export class TaskService{
    
    public tasks: Task[] = [
             new Task(1, 1, "Task#2"),
             new Task(2, 2, "Task#2"),
             new Task(3, 3, "Task#3")
           // etc.
       ];

       getAllTasks(): Task[] {
            
           return this.tasks;
       }

       addNewTask(taskId_: number, userId_: number, name_: string){
            
           this.tasks.push(new Task(taskId_, userId_, name_));
       }

       removeTask(task: Task){
           var indexOfTask = this.tasks.indexOf(task);
           this.tasks.splice(indexOfTask, 1);
       }

   }

