import { ClientPoint } from './clientPoint';
import { Point } from './point';

export class TaskRequest {
    public taskId: number;
    public name: string;
    public checkpoints: ClientPoint[];
    public way: ClientPoint[];
    public time: Date;
    public userId: number;
    public isFavourite: boolean;
    public startPoint: ClientPoint;
    public mode: string;
}