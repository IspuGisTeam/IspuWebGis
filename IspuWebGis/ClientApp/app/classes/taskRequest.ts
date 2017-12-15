import { ClientPoint } from './clientPoint';

export class TaskRequest {
    public taskId: number ;
    public name: string;
    public checkpoints: ClientPoint[];
    public time: Date;
    public userId: number;
    public isFavourite: boolean;
    public startPoint: ClientPoint;
    public mode: string;
}